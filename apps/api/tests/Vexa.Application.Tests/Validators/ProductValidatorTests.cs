using FluentValidation.TestHelper;
using Vexa.Application.DTOs;
using Vexa.Application.Validators;

namespace Vexa.Application.Tests.Validators;

public class ProductValidatorTests
{
    [Fact]
    public void Create_should_require_name_and_references()
    {
        CreateProductRequest request = new() { Name = "", BrandId = 0, CategoryId = 0 };
        CreateProductRequestValidator validator = new();

        TestValidationResult<CreateProductRequest> result = validator.TestValidate(request);

        result.ShouldHaveValidationErrorFor(item => item.Name);
        result.ShouldHaveValidationErrorFor(item => item.BrandId);
        result.ShouldHaveValidationErrorFor(item => item.CategoryId);
    }

    [Fact]
    public void Update_should_allow_missing_name_and_slug()
    {
        UpdateProductRequest request = new() { BrandId = 1, CategoryId = 1 };
        UpdateProductRequestValidator validator = new();

        TestValidationResult<UpdateProductRequest> result = validator.TestValidate(request);

        result.ShouldNotHaveValidationErrorFor(item => item.BrandId);
        result.ShouldNotHaveValidationErrorFor(item => item.CategoryId);
    }
}
