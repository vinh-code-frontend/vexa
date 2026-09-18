namespace Vexa.Application.Interfaces;

public interface IBrandRepository
{
    Task<Brand?> GetByIdAsync(Guid id);

    Task<(List<Brand> Items, int TotalCount)> GetBrandListAsync(
        int page,
        int pageSize,
        string? search,
        string? sortBy,
        string? sortDirection);

    Task AddAsync(Brand brand);

    Task UpdateAsync(Brand brand);

    Task DeleteAsync(Brand brand);
}
