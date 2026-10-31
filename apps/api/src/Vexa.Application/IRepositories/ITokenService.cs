namespace Vexa.Application.Repositories;

public interface ITokenService
{
    string HashToken(string token);
    string GenerateToken();
    int GetExpiredRefreshTokenDays();
    (string token, DateTime expired) GenerateAccessToken(UserEntity user);
    (RefreshTokenEntity entity, string plainToken) GenerateRefreshToken(Guid userId);
}
