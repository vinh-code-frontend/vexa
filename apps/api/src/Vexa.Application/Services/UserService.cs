using Vexa.Application.Helpers;
using Vexa.Domain.Enums;

namespace Vexa.Application.Services;

public class UserService(
    IPasswordHasher passwordHasher,
    IUserRepository userRepository,
    IMapper mapper) : IUserService
{
    public async Task<List<UserResponse>> GetAllUsersAsync()
    {
        List<User> users = await userRepository.GetAllAsync();

        return mapper.Map<List<UserResponse>>(users);
    }

    public async Task<UserResponse?> GetUserByIdAsync(Guid userId)
    {
        return mapper.Map<UserResponse>(await userRepository.GetUserByIdAsync(userId));
    }

    public async Task<CreateUserResponse> CreateUserAsync(CreateUserRequest payload)
    {
        string username = payload.Username.Trim().ToLower();
        string email = payload.Email.Trim().ToLower();

        (bool isUsernameExist, bool isEmailExist) = await userRepository.CheckExistAsync(username, email);

        if (isUsernameExist)
        {
            throw new Exception($"Username {payload.Username} is already existing! Try another value to process!");
        }
        if (isEmailExist)
        {
            throw new Exception($"Email {payload.Email} is already existing! Try another value to process!");
        }
        string tempPwd = PasswordGenerator.Generate();
        User newUser = new()
        {
            Id = Guid.NewGuid(),
            Username = username,
            Email = email,
            Role = payload.Role,
            Status = UserStatus.Pending,
            HashedPassword = passwordHasher.HashPassword(tempPwd),
            CreatedAt = DateTime.UtcNow,

        };
        await userRepository.AddUserAsync(newUser);

        CreateUserResponse response = mapper.Map<CreateUserResponse>(newUser);
        response.TempPassword = tempPwd;

        return response;
    }
    public async Task DeleteUserAsync(Guid userId)
    {
        User user = await userRepository.GetUserByIdAsync(userId) ?? throw new Exception("User not found");

        await userRepository.DeleteUserAsync(user);
    }
}
