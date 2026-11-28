namespace Vexa.Domain.Entities;

public class ProductEntity
{
    public int Id { get; set; }
    public int BrandId { get; set; }
    public int CategoryId { get; set; }
    public required string Name { get; set; }
    public required string Slug { get; set; }
    public string? Description { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
    public Guid? DeletedBy { get; set; }
}
