namespace Vexa.Application.Interfaces;

public interface ICategoryRepository
{
    Task<Category?> GetByIdAsync(int id);
    Task<List<Category>> GetListAsync(
        int take,
        int skip,
        string? search,
        string? sortBy,
        SortDirection? sortDirection,
        int? parentId = null
    );
    Task AddAsync(Category category);
    Task UpdateAsync(Category category);
    Task DeleteAsync(Category category);
    Task<bool> ExistsAsync(string name, string slug, int? excludedId = null);
}
