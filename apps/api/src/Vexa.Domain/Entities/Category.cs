namespace Vexa.Domain.Entities;

public class Category : TimestampWithSoftDeleteEntity
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Slug { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; }
    public int? DisplayOrder { get; set; }
    public string? LogoUrl { get; set; }
    public int? ParentId { get; set; }
    public ICollection<Category> Children { get; set; } = [];
    public Category? Parent { get; set; }
}
