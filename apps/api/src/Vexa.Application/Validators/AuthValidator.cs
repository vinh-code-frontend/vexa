namespace Vexa.Application.Validators;

public sealed class LoginRequestValidator : AbstractValidator<LoginRequest>
{
    public LoginRequestValidator()
    {
        RuleFor(item => item.Username)
            .NotEmpty().WithMessage("Username is required.")
            .MinimumLength(3).WithMessage("Username must be at least 3 characters.")
            .MaximumLength(30).WithMessage("Username must not exceed 30 characters.");
        RuleFor(item => item.Password)
            .NotEmpty().WithMessage("Password is required.")
            .MinimumLength(6).WithMessage("Password must be at least 6 characters.")
            .MaximumLength(72).WithMessage("Password must not exceed 72 characters.");
    }
}

public sealed class ForgotPasswordRequestValidator : AbstractValidator<ForgotPasswordRequest>
{
    public ForgotPasswordRequestValidator()
    {
        RuleFor(item => item.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Invalid email address.");
    }
}

public sealed class ResetPasswordRequestValidator : AbstractValidator<ResetPasswordRequest>
{
    public ResetPasswordRequestValidator()
    {
        RuleFor(item => item.Token)
            .NotEmpty().WithMessage("Token is required.")
            .MaximumLength(128).WithMessage("Token must not exceed 128 characters.");
        RuleFor(item => item.NewPassword)
            .NotEmpty().WithMessage("Password is required.")
            .MinimumLength(6).WithMessage("Password must be at least 6 characters.")
            .MaximumLength(72).WithMessage("Password must not exceed 72 characters.");
        // .Matches("[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
        // .Matches("[0-9]").WithMessage("Password must contain at least one number.");
    }
}

public sealed class VerifyResetPasswordTokenRequestValidator : AbstractValidator<VerifyResetPasswordTokenRequest>
{
    public VerifyResetPasswordTokenRequestValidator()
    {
        RuleFor(item => item.Token)
            .NotEmpty().WithMessage("Token is required.")
            .MaximumLength(128).WithMessage("Token must not exceed 128 characters.");
    }
}
