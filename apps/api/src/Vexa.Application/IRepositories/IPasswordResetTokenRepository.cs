namespace Vexa.Application.Repositories;

public interface IPasswordResetTokenRepository
{
    Task<string> GenerateTokenByUserIdAsync(Guid userId);
}
