using Vexa.Domain.Enums;
using Microsoft.Extensions.DependencyInjection;

namespace Vexa.Infrastructure;

public static class DatabaseSeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        AppDbContext context = services.GetRequiredService<AppDbContext>();

        if (await context.Users.AnyAsync(x => x.Role == UserRole.Admin))
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("No changes from User seeder");
            return;
        }

        User admin = new()

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
        Console.WriteLine("Added user seeder succesfully!");
        Console.ResetColor();

    }
}
