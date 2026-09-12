namespace Vexa.Application.Repositories;

public interface IRefreshTokenRepository
{
    Task AddRefreshTokenAsync(RefreshToken refreshToken);
    Task<RefreshToken?> FindRefreshToken(string hashedToken);
}
