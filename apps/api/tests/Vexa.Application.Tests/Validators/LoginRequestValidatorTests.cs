using FluentValidation.Results;
using Vexa.Application.DTOs;
using Vexa.Application.Validators;
namespace Vexa.Application.Tests.Validators;

public class LoginRequestValidatorTests
{
    private readonly LoginRequestValidator _validator = new();

    [Fact]
    public void Validate_ValidRequest_IsValid()
    {
        ValidationResult result = _validator.Validate(new LoginRequest
        {
            Username = "valid-user",
            Password = "password"
        });

        Assert.True(result.IsValid);
    }

    [Fact]
    public void Validate_UsernameShorterThanThreeCharacters_IsInvalid()
    {
        ValidationResult result = _validator.Validate(new LoginRequest
        {
            Username = "ab",
            Password = "password"
        });

        Assert.False(result.IsValid);
        Assert.Contains(result.Errors, error => error.PropertyName == nameof(LoginRequest.Username));
    }

    [Fact]
    public void Validate_EmptyPassword_IsInvalid()
    {
        ValidationResult result = _validator.Validate(new LoginRequest
        {
            Username = "valid-user",
            Password = string.Empty
        });

        Assert.False(result.IsValid);
        Assert.Contains(result.Errors, error => error.PropertyName == nameof(LoginRequest.Password));
    }
}
