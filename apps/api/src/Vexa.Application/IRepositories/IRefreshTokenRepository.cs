namespace Vexa.Application.Repositories;

public interface IRefreshTokenRepository
{
    Task AddRefreshTokenAsync(RefreshTokenEntity refreshToken);
    Task<RefreshTokenEntity?> FindRefreshToken(string hashedToken);
}
