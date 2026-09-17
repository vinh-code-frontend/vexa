using Vexa.Api.Extensions;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using Vexa.Api.Middlewares;
using Serilog;
using System.Text.Json.Serialization;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateBootstrapLogger();

try
{
    Log.Information("Starting application");

    WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

    builder.Host.UseSerilog((context, services, configuration) =>
    {
        configuration
                .ReadFrom.Configuration(context.Configuration)
                .ReadFrom.Services(services)
                .Enrich.FromLogContext();
    });

    builder.Services.AddControllers().AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter()
        );
    });

    // AddOpenApi generates schemas from Http.Json.JsonOptions, not Mvc.JsonOptions above.
    builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options =>
    {
        options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

    builder.Services.Configure<RouteOptions>(options =>
    {
        options.LowercaseUrls = true;
    });

    // root api
    builder.Services.AddOpenApi("v1", options =>
    {
        options.ShouldInclude = _ => true;
    });

    // admin api
    builder.Services.AddOpenApi("admin", options =>
    {
        options.ShouldInclude = apiDesc => apiDesc.GroupName == "admin";
    });

    // client api
    builder.Services.AddOpenApi("client", options =>
    {
        options.ShouldInclude = apiDesc => apiDesc.GroupName == "client";
    });

    builder.Services.InitCustomServices(builder.Configuration);
    // builder.Services.AddDebugAuthentication();

    WebApplication app = builder.Build();

    if (args.Contains("seed"))
    {
        using IServiceScope scope = app.Services.CreateScope();

        IServiceProvider services = scope.ServiceProvider;
        await DatabaseSeeder.SeedAsync(services);

        return;
    }

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.MapOpenApi();


        app.MapScalarApiReference(options =>
        {
            options
                .AddDocument("v1", "Root API", isDefault: true)
                .AddDocument("admin", "Admin API")
                .AddDocument("client", "Client API");
            options.Theme = ScalarTheme.Default;
        });
    }

    if (!app.Environment.IsDevelopment())
    {
        app.UseHttpsRedirection();
    }

    app.UseMiddleware<ExceptionHandlingMiddleware>();

    app.UseSerilogRequestLogging();

    app.UseCors("AllowFrontend");

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();

    app.UseAppHealthCheck();

    app.Lifetime.ApplicationStarted.Register(() =>
    {
        Microsoft.Extensions.Logging.ILogger logger = app.Logger;

        foreach (string url in app.Urls)
        {
            logger.LogInformation("Listening on: {Url}", url);

            logger.LogInformation("API documentation:");

            logger.LogInformation("Admin API documentation:");
            logger.LogInformation("  - OpenAPI: {Url}/openapi/admin.json", url);
            logger.LogInformation("  - Scalar : {Url}/scalar/admin", url);

            logger.LogInformation("Client API documentation:");
            logger.LogInformation("  - OpenAPI: {Url}/openapi/client.json", url);
            logger.LogInformation("  - Scalar : {Url}/scalar/client", url);
        }
    });

    app.Run();
}
catch (Exception ex) when (ex is not HostAbortedException)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}
