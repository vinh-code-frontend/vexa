namespace Vexa.Application.Validators;

public sealed class CreateBrandRequestValidator
    : AbstractValidator<CreateBrandRequest>
{
    public CreateBrandRequestValidator()
    {
        RuleFor(request => request.Name)
            .NotEmpty()
            .WithMessage("Name is required.")
            .MaximumLength(100)
            .WithMessage("Name must not exceed 100 characters.");

        RuleFor(request => request.Description)
            .MaximumLength(500)
            .WithMessage("Description must not exceed 500 characters.");

        RuleFor(request => request.LogoUrl)
            .MaximumLength(500)
            .WithMessage("LogoUrl must not exceed 500 characters.");

        RuleFor(request => request.DisplayOrder)
            .GreaterThanOrEqualTo(0)
            .WithMessage("DisplayOrder must be greater than or equal to 0.");
    }
}

public sealed class UpdateBrandRequestValidator
    : AbstractValidator<UpdateBrandRequest>
{
    public UpdateBrandRequestValidator()
    {
        RuleFor(request => request.Name)
            .NotEmpty()
            .WithMessage("Name is required.")
            .MaximumLength(100)
            .WithMessage("Name must not exceed 100 characters.");

        RuleFor(request => request.Description)
            .MaximumLength(500)
            .WithMessage("Description must not exceed 500 characters.");

        RuleFor(request => request.LogoUrl)
            .MaximumLength(500)
            .WithMessage("LogoUrl must not exceed 500 characters.");

        RuleFor(request => request.DisplayOrder)
            .GreaterThanOrEqualTo(0)
            .WithMessage("DisplayOrder must be greater than or equal to 0.");
    }
}
