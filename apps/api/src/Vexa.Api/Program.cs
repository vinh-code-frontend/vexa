using Vexa.Api.Extensions;
using Vexa.Api.Middlewares;
using Serilog;
using Serilog.Context;
using System.Diagnostics;
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

    builder.Services.AddControllers(options =>
    {
        options.Filters.Add<FluentValidationActionFilter>();
    }).AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter()
        );
    });

    builder.Services.AddDevOpenApi(builder.Configuration);
    // builder.Services.AddDebugAuthentication();

    WebApplication app = builder.Build();

    await app.ApplyMigrationsAsync();
    await app.ApplySeedAsync(args);

    app.UseDevOpenApi();


    // Configure the HTTP request pipeline.
    if (!app.Environment.IsDevelopment())
    {
        app.UseHttpsRedirection();
    }

    app.Use(async (context, next) =>
    {
        using (LogContext.PushProperty("TraceId", Activity.Current?.TraceId.ToString() ?? context.TraceIdentifier))
        using (LogContext.PushProperty("SpanId", Activity.Current?.SpanId.ToString() ?? "-"))
        {
            await next();
        }
    });

    app.UseMiddleware<ExceptionHandlingMiddleware>();

    app.UseSerilogRequestLogging();

    app.UseCors("AllowFrontend");

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();

    app.UseAppHealthCheck();

    app.LogDevOpenApi();

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

