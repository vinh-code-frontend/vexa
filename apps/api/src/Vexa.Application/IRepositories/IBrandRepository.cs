namespace Vexa.Application.Interfaces;

public interface IBrandRepository
{
    Task<BrandEntity?> GetByIdAsync(int id);
    Task<BrandEntity?> GetByIdIncludingDeletedAsync(int id);
    Task<bool> ExistsAsync(string name, string slug, int? excludedId = null);
    Task<(List<BrandEntity> Items, int TotalCount)> GetBrandListAsync(
        int page,
        int pageSize,
        string? search,
        string? sortBy,
        SortDirection? sortDirection,
        bool? isActive);
    Task AddAsync(BrandEntity brand);
    Task UpdateAsync(BrandEntity brand);
    Task SoftDeleteAsync(BrandEntity brand, Guid? deletedBy);
}
