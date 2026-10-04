using Vexa.Api.Extensions;
using Vexa.Application.Exceptions;
namespace Vexa.Api.Controllers;

[Route("api/admin/auth")]
[AllowAnonymous]
[Tags("Auth")]
public class AdminAuthController(IAuthService authService, ITokenService tokenService) : AdminApiControllerBase
{
    private readonly string _refreshTokenKey = "refresh-token";
    private readonly string _csrfTokenKey = "csrf-token";
    private readonly string _csrfHeaderKey = "X-CSRF-Token";

    [HttpPost("register")]
    public async Task<bool> RegisterAsync([FromBody] RegisterRequest registerRequest)
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
    [RequireCsrfToken]
    public async Task<LoginResponse> RefreshAsync()
    {
        string? refreshToken = Request.Cookies[_refreshTokenKey];
        string? csrfToken = Request.Cookies[_csrfTokenKey];
        string? csrfHeader = Request.Headers[_csrfHeaderKey];
        if (refreshToken is string && csrfToken is string && csrfToken == csrfHeader)
        {
            LoginResponse result = await authService.RefreshTokenAsync(refreshToken);
            AppendAuthCookies(result);

            return result;
        }
        throw new UnauthorizedException("Failed to refresh token");
    }

    [HttpPost("forgot-passowrd")]
    public async Task<IActionResult> ForgotPasswordAsync([FromBody] ForgotPasswordRequest request)
    {
        await authService.ForgotPasswordAsync(request.Email);

        return Ok();
    }

    [HttpPost("verify-reset-password-token")]
    public async Task<IActionResult> VerifyResetPasswordTokenAsync([FromBody] VerifyResetPasswordTokenRequest request)
    {
        _ = await authService.VerifyResetPasswordTokenAsync(request.Token);
        return Ok();
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPasswordAsync([FromBody] ResetPasswordRequest request)
    {
        await authService.ResetPasswordAsync(request);
        return Ok();
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
