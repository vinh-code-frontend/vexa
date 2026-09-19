namespace Vexa.Application.Interfaces;

public interface IBrandRepository
{
    Task<Brand?> GetByIdAsync(int id);

    Task<Brand?> GetByIdIncludingDeletedAsync(int id);

    Task<bool> ExistsAsync(string name, string slug, int? excludedId = null);

    Task<(List<Brand> Items, int TotalCount)> GetBrandListAsync(
        int page,
        int pageSize,
        string? search,
        string? sortBy,
        string? sortDirection);

    Task AddAsync(Brand brand);

    Task UpdateAsync(Brand brand);

    Task SoftDeleteAsync(Brand brand, Guid? deletedBy);
}
