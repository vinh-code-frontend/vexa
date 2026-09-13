namespace Vexa.Application.DTOs;

public class BrandDetailResponse
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Slug { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; }
    public int? DisplayOrder { get; set; }
    public string? LogoUrl { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}

public class BrandResponse
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; }
    public int? DisplayOrder { get; set; }
    public string? LogoUrl { get; set; }
}
