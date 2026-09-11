using System.Reflection;
using Vexa.Application;
using Vexa.Application.Repositories;
using Vexa.Infrastructure;
using Vexa.Infrastructure.Authentication;
using FluentValidation;

namespace Vexa.Api.Extensions;

public static class AppDIServiceExtension
{
    public static IServiceCollection AddImplementationsFromAssembly(
        this IServiceCollection services,
        Assembly assembly,
        string suffix,
        string namespaceSuffix,
        ServiceLifetime lifetime = ServiceLifetime.Scoped
    )
    {
        var implementationTypes = assembly
            .GetTypes()
            .Where(t =>
                t.IsClass &&
                !t.IsAbstract &&
                t.Name.EndsWith(suffix) &&
                t.Namespace?.EndsWith(namespaceSuffix) == true);

        foreach (var implementationType in implementationTypes)
        {
            var interfaceType = implementationType
                .GetInterfaces()
                .FirstOrDefault(i =>
                    i.Name == $"I{implementationType.Name}");

            if (interfaceType is not null)
            {
                services.Add(new ServiceDescriptor(
                    interfaceType,
                    implementationType,
                    lifetime));
            }
        }
        return services;
    }
    public static IServiceCollection AddApplicationServicesFromAssembly(this IServiceCollection services)
    {
        return services.AddImplementationsFromAssembly(typeof(ApplicationAssemblyMarker).Assembly, "Service", ".Services");
    }
    public static IServiceCollection AddInfrastructureServiceFromAssembly(this IServiceCollection services)
    {
        return services.AddImplementationsFromAssembly(typeof(InfrastructureAssemblyMarker).Assembly, "Repository", ".Repositories");
    }
    public static IServiceCollection AddPersistenceServices(this IServiceCollection services)
    {
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IPasswordHasher, PasswordHashder>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();

        return services;
    }
    public static IServiceCollection AddAppDIServiceExtension(this IServiceCollection services)
    {
        services.AddAutoMapper(typeof(ApplicationAssemblyMarker).Assembly);
        services.AddPersistenceServices();
        services.AddApplicationServicesFromAssembly();
        services.AddInfrastructureServiceFromAssembly();

        return services;
    }
}
