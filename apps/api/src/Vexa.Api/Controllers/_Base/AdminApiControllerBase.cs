namespace Vexa.Api.Controllers;

[ApiController]
[ApiExplorerSettings(GroupName = "admin")]
[Authorize(Roles = "Admin")]
public abstract class AdminApiControllerBase : ControllerBase
{

}
