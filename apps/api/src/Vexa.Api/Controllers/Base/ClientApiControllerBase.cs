namespace Vexa.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[ApiExplorerSettings(GroupName = "client")]
[AllowAnonymous]
public abstract class ClientApiControllerBase : ControllerBase
{

}
