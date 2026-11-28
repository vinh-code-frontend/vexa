namespace Vexa.Application.Interfaces;

public interface IProductRepository
{
    Task<ProductEntity?> GetByIdAsync(int id);
    Task<ProductEntity?> GetByIdIncludingDeletedAsync(int id);
    Task<bool> ExistsAsync(string name, string slug, int? excludedId = null);
    Task<bool> ReferencesExistAsync(int brandId, int categoryId);
    Task<(List<ProductEntity> Items, int TotalCount)> GetProductListAsync(
        int page,
        int pageSize,
        string? search,
        string? sortBy,
        SortDirection? sortDirection,
        int? brandId,
        int? categoryId);
    Task AddAsync(ProductEntity product);
    Task UpdateAsync(ProductEntity product);
    Task SoftDeleteAsync(ProductEntity product, Guid? deletedBy);
}
