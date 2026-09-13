namespace Vexa.Application.Interfaces;

public interface IAuthService
{
    Task<bool> RegisterAsync(RegisterRequest registerRequest);
    Task<LoginResponse> LoginAsync(LoginRequest loginRequest);
    Task<LoginResponse> RefreshTokenAsync(string refreshToken);
}
