using Microsoft.EntityFrameworkCore;

namespace Vexa.Api.Extensions;

public static class AppMigrationExtension
{
    public static async Task ApplyMigrationsAsync(this WebApplication app)
    {
        await using AsyncServiceScope scope = app.Services.CreateAsyncScope();

        ILogger<ILoggerFactory> logger = scope.ServiceProvider
            .GetRequiredService<ILogger<ILoggerFactory>>();

        string? connectionString = app.Configuration["VexaConnectionStrings:DefaultConnection"];
        if (string.IsNullOrWhiteSpace(connectionString))
        {
            logger.LogWarning("Database connection string is not configured. Skipping database migrations.");
            return;
        }

        AppDbContext dbContext = scope.ServiceProvider
            .GetRequiredService<AppDbContext>();

        List<string> pendingMigrations = (await dbContext.Database.GetPendingMigrationsAsync()).ToList();

        if (pendingMigrations.Count == 0)
        {
            logger.LogInformation("Database is up to date. No migrations to apply.");

            return;
        }

        logger.LogInformation("Found {Count} pending migrations: {Migrations}", pendingMigrations.Count, string.Join(", ", pendingMigrations));

        await dbContext.Database.MigrateAsync();

        logger.LogInformation("Database migrations applied successfully.");
    }

    public static async Task ApplySeedAsync(this WebApplication app, string[] args)
    {
        if (args.Contains("seed"))
        {
            using IServiceScope scope = app.Services.CreateScope();

            IServiceProvider services = scope.ServiceProvider;
            await DatabaseSeeder.SeedAsync(services);

            return;
        }
    }
}
