namespace Vexa.Application.DTOs;

public class CategoryListRequest : ListRequest
{
    public int? ParentId { get; set; }
}

public class CreateCategoryRequest
{
    public required string Name { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; } = true;
    public int? DisplayOrder { get; set; }
    public string? LogoUrl { get; set; }
    public int? ParentId { get; set; }
}

public class UpdateCategoryRequest
{
    public required string Name { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; } = true;
    public int? DisplayOrder { get; set; }
    public string? LogoUrl { get; set; }
    public int? ParentId { get; set; }
}
