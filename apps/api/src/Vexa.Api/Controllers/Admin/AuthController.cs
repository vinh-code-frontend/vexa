using Microsoft.Extensions.Primitives;

namespace Vexa.Api.Controllers;

[Route("api/admin/auth")]
[AllowAnonymous]
public class AdminAuthController(IAuthService authService, ITokenService tokenService) : AdminApiControllerBase
{
    private readonly string _refreshTokenKey = "refresh-token";
    private readonly string _csrfTokenKey = "csrf-token";
    private readonly string _csrfHeaderKey = "X-CSRF-Token";

    [HttpPost("register")]
    public async Task<bool> Register([FromBody] RegisterRequest registerRequest)
    {
        return await authService.RegisterAsync(registerRequest);
    }

    [HttpPost("login")]
    public async Task<LoginResponse> Login([FromBody] LoginRequest loginRequest)
    {
        LoginResponse result = await authService.LoginAsync(loginRequest);
        AppendAuthCookies(result);

        return result;
    }

    [HttpPost("refresh")]
    public async Task<LoginResponse> Refresh()
    {
        string? refreshToken = Request.Cookies[_refreshTokenKey];
        string? csrfToken = Request.Cookies[_csrfTokenKey];
        StringValues csrfHeader = Request.Headers[_csrfHeaderKey];
        if (refreshToken is string && csrfToken is string && csrfToken == csrfHeader)
        {
            LoginResponse result = await authService.RefreshTokenAsync(refreshToken);
            AppendAuthCookies(result);

            return result;
        }
        throw new Exception("Failed to refresh token");
    }

    private void AppendAuthCookies(LoginResponse response)
    {
        DateTimeOffset expiresAt = DateTimeOffset.UtcNow.AddDays(tokenService.GetExpiredRefreshTokenDays());

        Response.Cookies.Append(
            _refreshTokenKey,
            response.RefreshToken,
            new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = expiresAt
            });

        Response.Cookies.Append(
            _csrfTokenKey,
            response.CsrfToken,
            new CookieOptions
            {
                HttpOnly = false,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = expiresAt
            });
    }
}
