using Vexa.Application.Interfaces;

namespace Vexa.Infrastructure.Repositories;

public class CategoryRepository(AppDbContext db) : BaseRepository<Category>(db), ICategoryRepository
{
    public async Task<List<Category>> GetListAsync(int take, int skip, string? search, string? sortBy, SortDirection? sortDirection, int? parentId = null)
    {
        IQueryable<Category> query = Query().Where(item => item.DeletedAt == null);

        if (!string.IsNullOrWhiteSpace(search))
        {
            string searchPattern = $"%{search.Trim()}%";
            query = query.Where(item =>
                EF.Functions.ILike(item.Name, searchPattern) ||
                EF.Functions.ILike(item.Slug, searchPattern) ||
                (item.Description != null && EF.Functions.ILike(item.Description, searchPattern)));
        }

        bool descending = sortDirection == SortDirection.Desc;
        query = sortBy?.Trim().ToLowerInvariant() switch
        {
            "name" => descending
                ? query.OrderByDescending(item => item.Name).ThenBy(item => item.Id)
                : query.OrderBy(item => item.Name).ThenBy(item => item.Id),
            "slug" => descending
                ? query.OrderByDescending(item => item.Slug).ThenBy(item => item.Id)
                : query.OrderBy(item => item.Slug).ThenBy(item => item.Id),
            "displayorder" => descending
                ? query.OrderByDescending(item => item.DisplayOrder).ThenBy(item => item.Id)
                : query.OrderBy(item => item.DisplayOrder).ThenBy(item => item.Id),
            "createdat" => descending
                ? query.OrderByDescending(item => item.CreatedAt).ThenBy(item => item.Id)
                : query.OrderBy(item => item.CreatedAt).ThenBy(item => item.Id),
            _ => query
                .OrderBy(item => item.DisplayOrder)
                .ThenBy(item => item.Name)
                .ThenBy(item => item.Id)
        };

        List<Category> items = await query
            .Take(take)
            .Skip(skip)
            .ToListAsync();

        return items;
    }

    public async Task<Category?> GetByIdAsync(int id, bool includeDeleted = false)
    {
        return await Query().FirstOrDefaultAsync(item => item.Id == id && (includeDeleted || item.DeletedAt == null));
    }
    public async Task AddAsync(Category category)
    {
        DbSet.Add(category);
        await SaveChangesAsync();
    }

    public async Task SoftDeleteAsync(Category category, Guid? deletedBy)
    {
        DateTime deletedAt = DateTime.UtcNow;
        category.DeletedAt = deletedAt;
        category.UpdatedAt = deletedAt;
        category.DeletedBy = deletedBy;
        DbSet.Update(category);
        await SaveChangesAsync();
    }

    public async Task UpdateAsync(Category category)
    {
        DbSet.Update(category);
        await SaveChangesAsync();
    }

    public async Task<bool> ExistsAsync(string name, string slug, int? excludedId = null)
    {
        return await DbSet.AnyAsync(item =>
            (item.Id != excludedId || excludedId == null) &&
            (item.Name == name || item.Slug == slug));
    }


}
