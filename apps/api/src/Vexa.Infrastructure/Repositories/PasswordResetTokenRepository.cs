namespace Vexa.Infrastructure.Repositories;

public class PasswordResetTokenRepository(AppDbContext db, ITokenService tokenService) : IPasswordResetTokenRepository
{
    public async Task<PasswordResetTokenEntity?> FindByTokenAsync(string token)
    {
        return await db.PasswordResetTokens.AsNoTracking().FirstOrDefaultAsync(t => t.HashedToken == token);
    }

    public async Task<string> GenerateTokenByUserIdAsync(Guid userId)
    {
        DateTime now = DateTime.UtcNow;

        List<PasswordResetTokenEntity> oldTokens = await db.PasswordResetTokens.AsNoTracking()
            .Where(t => t.UserId == userId && t.UsedAt == null && t.RevokedAt == null)
            .ToListAsync();

        foreach (PasswordResetTokenEntity item in oldTokens)
        {
            item.RevokedAt = now;
        }

        string token = tokenService.GenerateToken();

        PasswordResetTokenEntity newToken = new()
        {
            UserId = userId,
            HashedToken = tokenService.HashToken(token),
            ExpiresAt = now.AddHours(1),
            CreatedAt = now
        };

        await db.PasswordResetTokens.AddAsync(newToken);
        await db.SaveChangesAsync();

        return token;
    }
}
