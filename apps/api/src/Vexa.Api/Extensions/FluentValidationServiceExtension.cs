using FluentValidation;
using FluentValidation.AspNetCore;

namespace Vexa.Api.Extensions;

public static class FluentValidationServiceExtension
{
    public static IServiceCollection AddFluentValidationServiceExtension(this IServiceCollection services)
    {
        services.AddFluentValidationAutoValidation();
        services.AddValidatorsFromAssemblyContaining<ApplicationAssemblyMarker>();

        return services;
    }
}
