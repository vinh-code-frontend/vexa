namespace Vexa.Application.DTOs;

public class CreateProductRequest
{
    public required string Name { get; set; }
    public int BrandId { get; set; }
    public int CategoryId { get; set; }
    public string? Description { get; set; }
}

public class UpdateProductRequest
{
    public int BrandId { get; set; }
    public int CategoryId { get; set; }
    public string? Description { get; set; }
}

public class ProductPaginationRequest : PaginationRequest
{
    public int? BrandId { get; set; }
    public int? CategoryId { get; set; }
}
