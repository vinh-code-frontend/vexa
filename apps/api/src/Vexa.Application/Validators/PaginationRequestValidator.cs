namespace Vexa.Application.Validators;

public class PaginationRequestValidator : AbstractValidator<PaginationRequest>
{
    public PaginationRequestValidator()
    {
        RuleFor(request => request.PageSize)
            .InclusiveBetween(0, 100)
            .WithMessage("PageSize must be between 0 and 100.");
    }
}
