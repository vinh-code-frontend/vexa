namespace Vexa.Application.Interfaces;

public interface ICategoryRepository
{
    Task<CategoryEntity?> GetByIdAsync(int id, bool includeDeleted = false);
    Task<List<CategoryEntity>> GetListAsync(
        int take,
        int skip,
        string? search,
        string? sortBy,
        SortDirection? sortDirection,
        int? parentId = null
    );
    Task AddAsync(CategoryEntity category);
    Task UpdateAsync(CategoryEntity category);
    Task SoftDeleteAsync(CategoryEntity category, Guid? deletedBy);
    Task<bool> ExistsAsync(string name, string slug, int? excludedId = null);
}
