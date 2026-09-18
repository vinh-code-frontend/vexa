namespace Vexa.Api.Controllers;

[Route("api/admin/users")]
[Tags("User")]
public class AdminUserController(IUserService userService) : AdminApiControllerBase
{
    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<List<UserResponse>>> GetUsers()
    {
        return Ok(await userService.GetAllUsersAsync());
    }
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<UserResponse?>> GetUserById(Guid id)
    {
        return Ok(await userService.GetUserByIdAsync(id));
    }
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<CreateUserResponse>> CreateUser(CreateUserRequest value)
    {
        return Ok(await userService.CreateUserAsync(value));
    }
    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeleteUser(Guid id)
    {
        await userService.DeleteUserAsync(id);

        return NoContent();
    }
}
