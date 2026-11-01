using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Vexa.Infrastructure;

namespace Vexa.Seeder;

public class Bootstrap
{
    public static async Task Main(string[] args)
    {
        HostApplicationBuilder builder = Host.CreateApplicationBuilder(new HostApplicationBuilderSettings
        {
            Args = args,
            ContentRootPath = AppContext.BaseDirectory
        });

        string? connectionString = builder.Configuration["VexaConnectionStrings:DefaultConnection"];
        if (string.IsNullOrWhiteSpace(connectionString))
        {
            throw new InvalidOperationException(
                "VexaConnectionStrings:DefaultConnection is not configured.");
        }

        builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(connectionString));

        using IHost host = builder.Build();
        using IServiceScope scope = host.Services.CreateScope();

        await UserSeeder.SeedAsync(scope.ServiceProvider);
    }
}
