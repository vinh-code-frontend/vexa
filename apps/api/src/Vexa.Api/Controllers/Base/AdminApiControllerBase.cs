namespace Vexa.Api.Controllers;

[ApiController]
[ApiExplorerSettings(GroupName = "admin")]
[Authorize(Roles = "Admin")]
public class AdminApiControllerBase : ControllerBase
{

}
