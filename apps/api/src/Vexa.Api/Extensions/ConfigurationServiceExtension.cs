using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Vexa.Api.Extensions;

public static class ConfigurationServiceExtension
{
    public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(options =>
        {
            options.UseNpgsql(configuration["VexaConnectionStrings:DefaultConnection"]);
        });
        return services;
    }
    public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        JwtSettings jwtSettings = configuration.GetSection("Jwt").Get<JwtSettings>()!;
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtSettings.Issuer,
                ValidAudience = jwtSettings.Audience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key))
            };
            options.Events = new JwtBearerEvents
            {
                OnChallenge = async context =>
                {
                    ILogger logger = context.HttpContext.RequestServices
                        .GetRequiredService<ILoggerFactory>()
                        .CreateLogger("JwtBearerEvents");

                    logger.LogWarning(
                        "Authentication challenge for {Method} {Path}. Error: {Error}. Description: {ErrorDescription}",
                        context.Request.Method,
                        context.Request.Path,
                        context.Error ?? "none",
                        context.ErrorDescription ?? "none");

                    context.HandleResponse();
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    context.Response.ContentType = "application/json";

                    string result = JsonSerializer.Serialize(new
                    {
                        statusCode = StatusCodes.Status401Unauthorized,
                        message = "Unauthorized. Token is missing or invalid."
                    });

                    await context.Response.WriteAsync(result);
                },
                OnForbidden = async context =>
                {
                    ILogger logger = context.HttpContext.RequestServices
                        .GetRequiredService<ILoggerFactory>()
                        .CreateLogger("JwtBearerEvents");

                    logger.LogWarning(
                        "Authorization forbidden for {Method} {Path}. User: {User}. AuthenticationType: {AuthenticationType}. Endpoint: {Endpoint}",
                        context.Request.Method,
                        context.Request.Path,
                        context.HttpContext.User.Identity?.Name ?? "anonymous",
                        context.HttpContext.User.Identity?.AuthenticationType ?? "none",
                        context.HttpContext.GetEndpoint()?.DisplayName ?? "unknown");

                    context.Response.StatusCode = StatusCodes.Status403Forbidden;
                    context.Response.ContentType = "application/json";

                    string result = JsonSerializer.Serialize(new
                    {
                        statusCode = 403,
                        message = "Forbidden. You do not have permission to access this resource."
                    });

                    await context.Response.WriteAsync(result);
                },
                OnAuthenticationFailed = context =>
                {
                    ILogger logger = context.HttpContext.RequestServices
                        .GetRequiredService<ILoggerFactory>()
                        .CreateLogger("JwtBearerEvents");

                    logger.LogWarning(
                        context.Exception,
                        "JWT authentication failed for {Method} {Path}",
                        context.Request.Method,
                        context.Request.Path);

                    return Task.CompletedTask;
                }
            };
        });
        return services;
    }
    public static IServiceCollection AddCorsPolicy(this IServiceCollection services, IConfiguration configuration)
    {
        string[] allowedOrigins = configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];
        services.AddCors(options =>
        {
            options.AddPolicy("AllowFrontend", policy =>
            {
                policy.WithOrigins(allowedOrigins)
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
            });
        });
        return services;
    }
    public static IServiceCollection AddConfigurationServiceExtension(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDatabase(configuration);
        services.AddJwtAuthentication(configuration);
        services.AddCorsPolicy(configuration);

        return services;
    }
}
