using FluentValidation;

namespace Vexa.Api.Extensions;

public static class FluentValidationServiceExtension
{
    public static IServiceCollection AddFluentValidationServiceExtension(this IServiceCollection services)
    {
        services.AddValidatorsFromAssemblyContaining<ApplicationAssemblyMarker>();
        services.AddScoped<FluentValidationActionFilter>();

        return services;
    }
}
