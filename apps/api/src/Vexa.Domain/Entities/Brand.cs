namespace Vexa.Domain.Entities;

public class Brand : TimestampWithSoftDeleteEntity
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Slug { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; }
    public int? DisplayOrder { get; set; }
    public string? LogoUrl { get; set; }
}
