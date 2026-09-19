using System.Security.Claims;

namespace Vexa.Application.Services;

public class CurrentUserService(IHttpContextAccessor httpContextAccessor) : ICurrentUserService
{
    public Guid? UserId
    {
        get
        {
            string? value = httpContextAccessor.HttpContext?.User
                .FindFirst(ClaimTypes.NameIdentifier)?.Value;

            return Guid.TryParse(value, out Guid userId) ? userId : null;
        }
    }
}
