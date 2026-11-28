namespace Vexa.Application.Validators;

public sealed class CreateProductRequestValidator : AbstractValidator<CreateProductRequest>
{
    public CreateProductRequestValidator()
    {
        RuleFor(request => request.Name)
            .NotEmpty()
            .WithMessage("Name is required.")
            .MaximumLength(100)
            .WithMessage("Name must not exceed 100 characters.");

        RuleFor(request => request.BrandId)
            .GreaterThan(0)
            .WithMessage("BrandId must be greater than 0.");

        RuleFor(request => request.CategoryId)
            .GreaterThan(0)
            .WithMessage("CategoryId must be greater than 0.");

        RuleFor(request => request.Description)
            .MaximumLength(500)
            .WithMessage("Description must not exceed 500 characters.");
    }
}

public sealed class UpdateProductRequestValidator : AbstractValidator<UpdateProductRequest>
{
    public UpdateProductRequestValidator()
    {
        RuleFor(request => request.BrandId)
            .GreaterThan(0)
            .WithMessage("BrandId must be greater than 0.");

        RuleFor(request => request.CategoryId)
            .GreaterThan(0)
            .WithMessage("CategoryId must be greater than 0.");

        RuleFor(request => request.Description)
            .MaximumLength(500)
            .WithMessage("Description must not exceed 500 characters.");
    }
}
