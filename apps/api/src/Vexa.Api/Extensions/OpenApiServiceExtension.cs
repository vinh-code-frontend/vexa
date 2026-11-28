using Microsoft.AspNetCore.OpenApi;
using Microsoft.OpenApi;
using System.Text.Json.Serialization;
using System.Text.Json;
using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Scalar.AspNetCore;

namespace Vexa.Api.Extensions;

public static class OpenApiServiceExtension
{
    public static OpenApiOptions AddVexaPostmanMetadata(this OpenApiOptions options, IConfiguration configuration)
    {
        string baseUrl = configuration["Api:BaseUrl"] ?? "http://localhost:5073";
        options.AddDocumentTransformer((document, _, _) =>
        {
            document.Servers = [new OpenApiServer { Url = baseUrl }];
            document.Components ??= new OpenApiComponents();
            document.Components.SecuritySchemes ??= new Dictionary<string, IOpenApiSecurityScheme>();
            document.Components.SecuritySchemes["Bearer"] = new OpenApiSecurityScheme
            {
                Type = SecuritySchemeType.Http,
                Scheme = "bearer",
                BearerFormat = "JWT",
                Description = "Enter the JWT token. Postman will send it as Bearer <token>."
            };
            return Task.CompletedTask;
        });

        options.AddOperationTransformer((operation, context, _) =>
        {
            if (operation.Parameters is not null)
            {
                foreach (OpenApiParameter parameter in operation.Parameters)
                {
                    if (parameter.In == ParameterLocation.Query)
                    {
                        parameter.Name = JsonNamingPolicy.CamelCase.ConvertName(parameter.Name);
                    }
                }
            }

            IList<object> metadata = context.Description.ActionDescriptor.EndpointMetadata;
            bool allowsAnonymous = metadata.OfType<IAllowAnonymous>().Any();
            bool requiresAuthorization = !allowsAnonymous && metadata.OfType<IAuthorizeData>().Any();
            if (requiresAuthorization)
            {
                operation.Security ??= [];
                operation.Security.Add(new OpenApiSecurityRequirement
                {
                    [new OpenApiSecuritySchemeReference("Bearer", context.Document, null)] = []
                });
            }

            if (metadata.OfType<RequireCsrfTokenAttribute>().Any())
            {
                operation.Parameters ??= [];
                operation.Parameters.Add(new OpenApiParameter
                {
                    Name = "X-CSRF-Token",
                    In = ParameterLocation.Header,
                    Required = true,
                    Schema = new OpenApiSchema { Type = JsonSchemaType.String },
                    Example = JsonValue.Create("{{csrfToken}}")
                });
            }
            return Task.CompletedTask;
        });
        return options;
    }

    public static void AddDevOpenApi(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options =>
        {
            options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
        });
        services.Configure<RouteOptions>(options => options.LowercaseUrls = true);

        services.AddOpenApi("v1", options =>
        {
            options.ShouldInclude = _ => true;
            options.AddVexaPostmanMetadata(configuration);
        });
        services.AddOpenApi("admin", options =>
        {
            options.ShouldInclude = apiDesc => apiDesc.GroupName == "admin";
            options.AddVexaPostmanMetadata(configuration);
        });
        services.AddOpenApi("client", options =>
        {
            options.ShouldInclude = apiDesc => apiDesc.GroupName == "client";
            options.AddVexaPostmanMetadata(configuration);
        });
        services.InitCustomServices(configuration);
    }

    public static void UseDevOpenApi(this WebApplication app)
    {
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
    }

    public static void LogDevOpenApi(this WebApplication app)
    {
        app.Lifetime.ApplicationStarted.Register(() =>
        {
            ILogger logger = app.Logger;
            IServerAddressesFeature? addressesFeature = app.Services
                .GetRequiredService<IServer>()
                .Features
                .Get<IServerAddressesFeature>();
            if (addressesFeature is null || addressesFeature.Addresses.Count == 0)
            {
                logger.LogWarning("Server addresses are unavailable; API documentation URLs were not logged.");
                return;
            }

            foreach (string url in addressesFeature.Addresses)
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
    }
}

[AttributeUsage(AttributeTargets.Method)]
public sealed class RequireCsrfTokenAttribute : Attribute;