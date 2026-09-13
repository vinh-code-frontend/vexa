namespace Vexa.Application.DTOs;

public class CreateBrandRequest
{
    public required string Name { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; } = true;
    public int? DisplayOrder { get; set; }
    public string? LogoUrl { get; set; }
}

public class UpdateBrandRequest
{
    public required string Name { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; } = true;
    public int? DisplayOrder { get; set; }
    public string? LogoUrl { get; set; }
}
