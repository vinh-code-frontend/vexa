namespace Vexa.Infrastructure.Repositories;

public class UserRepository(AppDbContext db) : IUserRepository
{
    public async Task<UserEntity?> GetUserByIdAsync(Guid userId)
    {
        return await db.Users.FindAsync(userId);
    }

    public async Task<UserEntity?> GetUserByEmailAsync(string email)
    {
        return await db.Users.FirstOrDefaultAsync(item => item.Email == email);
    }

    public async Task<UserEntity?> GetUserByUsernameAsync(string username)
    {
        string normalizedUsername = username.Trim().ToLower();

        return await db.Users.FirstOrDefaultAsync(user => user.Username.Trim().ToLower() == normalizedUsername);
    }

    public async Task AddUserAsync(UserEntity user)
    {
        db.Users.Add(user);
        await db.SaveChangesAsync();
    }

    public async Task UpdateUserAsync(UserEntity user)
    {
        user.UpdatedAt = DateTime.UtcNow;
        db.Users.Update(user);

        await db.SaveChangesAsync();
    }

    public async Task DeleteUserAsync(UserEntity user)
    {
        db.Users.Remove(user);
        await db.SaveChangesAsync();
    }

    public async Task<List<UserEntity>> GetAllAsync()
    {
        return await db.Users.ToListAsync();
    }

    public async Task<(bool isUsernameExist, bool isEmailExist)> CheckExistAsync(string username, string email)
    {
        bool isUsernameExist = await db.Users.AnyAsync(u => u.Username == username);
        bool isEmailExist = await db.Users.AnyAsync(u => u.Email == email);

        return (isUsernameExist, isEmailExist);
    }
}
