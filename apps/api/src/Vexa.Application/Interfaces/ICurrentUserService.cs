namespace Vexa.Application.Interfaces;

public interface ICurrentUserService
{
    Guid? UserId { get; }
}
