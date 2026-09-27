namespace Vexa.Api.Extensions;

using Vexa.Infrastructure.Utilities;

public static class ServiceExtensions
{
    public static IServiceCollection InitCustomServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddConfigurationServiceExtension(configuration);
        services.Configure<MailSettings>(configuration.GetSection("VexaMail"));
        services.AddAppDIServiceExtension();
        services.AddFluentValidationServiceExtension();

        services.AddAppHealthCheck();

        return services;
    }
}
