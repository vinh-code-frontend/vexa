namespace Vexa.Application.Repositories;

public interface IUserRepository
{
    Task<List<UserEntity>> GetAllAsync();
    Task<UserEntity?> GetUserByIdAsync(Guid userId);
    Task<UserEntity?> GetUserByEmailAsync(string email);
    Task<UserEntity?> GetUserByUsernameAsync(string username);
    Task<(bool isUsernameExist, bool isEmailExist)> CheckExistAsync(string username, string email);
    Task AddUserAsync(UserEntity user);
    Task UpdateUserAsync(UserEntity user);
    Task DeleteUserAsync(UserEntity user);
}
