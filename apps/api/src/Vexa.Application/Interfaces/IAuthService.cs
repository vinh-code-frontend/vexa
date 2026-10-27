namespace Vexa.Application.Interfaces;

public interface IAuthService
{
    Task<bool> RegisterAsync(RegisterRequest registerRequest);
    Task<LoginResponse> LoginAsync(LoginRequest loginRequest, bool isAdmin);
    Task<LoginResponse> RefreshTokenAsync(string refreshToken, bool isAdmin);
    Task ForgotPasswordAsync(string email);
    Task<Guid> VerifyResetPasswordTokenAsync(string token);
    Task ResetPasswordAsync(ResetPasswordRequest request);
}
