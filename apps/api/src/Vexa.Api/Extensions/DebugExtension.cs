using System.Diagnostics;
using System.Security.Claims;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Vexa.Domain.Entities;

namespace Vexa.Api.Extensions;

public static class DebugExtension
{
    public static IServiceCollection AddDebugAuthentication(this IServiceCollection services)
    {
        if (!Debugger.IsAttached)
        {
            return services;
        }

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = "DebugOrBearer";
            options.DefaultChallengeScheme = "DebugOrBearer";
        })
        .AddScheme<AuthenticationSchemeOptions, DebugAuthenticationHandler>("Debug", _ => { })
        .AddPolicyScheme("DebugOrBearer", "Debug or Bearer", options =>
        {
            options.ForwardDefaultSelector = context =>
                context.Request.Headers.Authorization.ToString().StartsWith(
                    "Bearer ", StringComparison.OrdinalIgnoreCase)
                    ? JwtBearerDefaults.AuthenticationScheme
                    : "Debug";
        });

        return services;
    }
}

internal sealed class DebugAuthenticationHandler(
    IOptionsMonitor<AuthenticationSchemeOptions> options,
    ILoggerFactory logger,
    UrlEncoder encoder,
    IUserRepository userRepository,
    IPasswordHasher passwordHasher)
    : AuthenticationHandler<AuthenticationSchemeOptions>(options, logger, encoder)
{
    private const string _debugUsername = "admin";
    private const string _debugPassword = "123456";

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        User? user = await userRepository.GetUserByUsernameAsync(_debugUsername);
        if (user is null || !passwordHasher.Verify(_debugPassword, user.HashedPassword))
        {
            return AuthenticateResult.Fail("Invalid username or password.");
        }

        List<Claim> claims =
        [
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.Role, user.Role.ToString())
        ];

        ClaimsIdentity identity = new(claims, Scheme.Name);
        return AuthenticateResult.Success(new AuthenticationTicket(new ClaimsPrincipal(identity), Scheme.Name));
    }

    protected override Task HandleChallengeAsync(AuthenticationProperties properties)
    {
        Response.StatusCode = StatusCodes.Status401Unauthorized;
        Response.Headers.WWWAuthenticate = "Basic realm=debug";
        return Task.CompletedTask;
    }
}
