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

        List<Category> items = await query
            .Take(take)
            .Skip(skip)
            .ToListAsync();
        return items;
    }

    public async Task<Category?> GetByIdAsync(int id)
    {
        return await Query().FirstOrDefaultAsync(item => item.Id == id && item.DeletedAt == null);
    }
    public async Task AddAsync(Category category)
    {
        DbSet.Add(category);
        await SaveChangesAsync();
    }

    public async Task DeleteAsync(Category category)
    {
        DbSet.Remove(category);
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
