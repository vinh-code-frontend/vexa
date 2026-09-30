namespace Vexa.Infrastructure.Repositories;

public class PasswordResetTokenRepository(AppDbContext db, ITokenService tokenService) : BaseRepository<PasswordResetToken>(db), IPasswordResetTokenRepository
{
    public async Task<string> GenerateTokenByUserIdAsync(Guid userId)
    {
        DateTime now = DateTime.UtcNow;

        List<PasswordResetToken> oldTokens = await DbSet
            .Where(t => t.UserId == userId && t.UsedAt == null && t.RevokedAt == null)
            .ToListAsync();

        foreach (PasswordResetToken item in oldTokens)
        {
            item.RevokedAt = now;
        }

        string token = tokenService.GenerateToken();

        PasswordResetToken newToken = new()
        {
            UserId = userId,
            HashedToken = tokenService.HashToken(token),
            ExpiresAt = now.AddHours(1),
            CreatedAt = now
        };

        await DbSet.AddAsync(newToken);
        await SaveChangesAsync();

        return token;
    }
}
