using Microsoft.AspNetCore.OpenApi;
using Microsoft.OpenApi;
using System.Text.Json.Nodes;

namespace Vexa.Api.Extensions;

public static class OpenApiServiceExtension
{
    public static OpenApiOptions AddVexaPostmanMetadata(
        this OpenApiOptions options,
        IConfiguration configuration)
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
}

[AttributeUsage(AttributeTargets.Method)]
public sealed class RequireCsrfTokenAttribute : Attribute;
