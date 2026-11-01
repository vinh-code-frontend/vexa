using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Vexa.Domain.Entities;
using Vexa.Domain.Enums;
using Vexa.Infrastructure;

namespace Vexa.Seeder;

public class UserSeeder
{
    public static async Task AddFirstAdmin(IServiceProvider services)
    {
        AppDbContext context = services.GetRequiredService<AppDbContext>();

        if (await context.Users.AnyAsync(x => x.Role == UserRole.Admin))
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("No changes from User seeder");
            Console.ResetColor();
            return;
        }

        UserEntity admin = new()
        {
            Id = Guid.NewGuid(),
            Username = "admin",
            Email = "admin@example.com",
            HashedPassword = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
            Role = UserRole.Admin,
            Status = UserStatus.Active
        };

        context.Users.Add(admin);

        await context.SaveChangesAsync();
        Console.WriteLine("Added user seeder successfully!");
    }
    public static async Task SeedAsync(IServiceProvider services)
    {
        await AddFirstAdmin(services);
    }
}
