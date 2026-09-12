namespace Vexa.Infrastructure.Repositories;

public class RefreshTokenRepository(AppDbContext db) : IRefreshTokenRepository
{
    public async Task AddRefreshTokenAsync(RefreshToken refreshToken)
    {
        db.RefreshTokens.Add(refreshToken);
        await db.SaveChangesAsync();
    }

    public async Task<RefreshToken?> FindRefreshToken(string hashedToken)
    {
        return await db.RefreshTokens
                .Include(r => r.User)
                .FirstOrDefaultAsync(r => r.HashedToken == hashedToken);
    }
}
