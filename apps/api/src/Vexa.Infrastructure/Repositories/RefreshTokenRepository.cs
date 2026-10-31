namespace Vexa.Infrastructure.Repositories;

public class RefreshTokenRepository(AppDbContext db) : IRefreshTokenRepository
{
    public async Task AddRefreshTokenAsync(RefreshTokenEntity refreshToken)
    {
        db.RefreshTokens.Add(refreshToken);
        await db.SaveChangesAsync();
    }

    public async Task<RefreshTokenEntity?> FindRefreshToken(string hashedToken)
    {
        return await db.RefreshTokens
                .Include(r => r.User)
                .FirstOrDefaultAsync(r => r.HashedToken == hashedToken);
    }
}
