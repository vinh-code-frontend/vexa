using FluentValidation.Results;
using Vexa.Application.DTOs;
using Vexa.Application.Validators;

namespace Vexa.Application.Tests.Validators;

public class PasswordResetValidatorTests
{
    private readonly ResetPasswordRequestValidator _resetValidator = new();
    private readonly VerifyResetPasswordTokenRequestValidator _verifyValidator = new();

    [Fact]
    public void Validate_ValidResetRequest_IsValid()
    {
        ValidationResult result = _resetValidator.Validate(new ResetPasswordRequest
        {
            Token = "valid-token",
            NewPassword = "Secure123"
        });

        Assert.True(result.IsValid);
    }

    [Fact]
    public void Validate_EmptyToken_IsInvalidForBothRequests()
    {
        ValidationResult resetResult = _resetValidator.Validate(new ResetPasswordRequest
        {
            Token = string.Empty,
            NewPassword = "Secure123"
        });
        ValidationResult verifyResult = _verifyValidator.Validate(new VerifyResetPasswordTokenRequest
        {
            Token = string.Empty
        });

        Assert.Contains(resetResult.Errors, error => error.PropertyName == nameof(ResetPasswordRequest.Token));
        Assert.Contains(verifyResult.Errors, error => error.PropertyName == nameof(VerifyResetPasswordTokenRequest.Token));
    }

    [Fact]
    public void Validate_ResetTokenTooLong_IsInvalid()
    {
        ValidationResult result = _resetValidator.Validate(new ResetPasswordRequest
        {
            Token = new string('a', 129),
            NewPassword = "Secure123"
        });

        Assert.False(result.IsValid);
        Assert.Contains(result.Errors, error => error.PropertyName == nameof(ResetPasswordRequest.Token));
    }

    [Theory]
    [InlineData("short")]
    [InlineData("ThisPasswordIsLongerThanSeventyTwoCharactersAndShouldBeRejected1234567890")]
    public void Validate_InvalidNewPassword_IsInvalid(string password)
    {
        ValidationResult result = _resetValidator.Validate(new ResetPasswordRequest
        {
            Token = "valid-token",
            NewPassword = password
        });

        Assert.False(result.IsValid);
        Assert.Contains(result.Errors, error => error.PropertyName == nameof(ResetPasswordRequest.NewPassword));
    }
}
