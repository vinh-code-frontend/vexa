namespace Vexa.Domain.Entities;

public class PasswordResetToken
{
    public int Id { get; set; }
    public Guid UserId { get; set; }
    public string HashedToken { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime? UsedAt { get; set; }
    public DateTime ExpiresAt { get; set; }
    public DateTime? RevokedAt { get; set; }
    public User User { get; set; } = null!;
}
