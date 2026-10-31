using Vexa.Application.Interfaces;

namespace Vexa.Infrastructure.Repositories;

public class BrandRepository(AppDbContext db) : BaseRepository<BrandEntity>, IBrandRepository
{
    public async Task AddAsync(BrandEntity brand)
    {
        db.Brands.Add(brand);
        await db.SaveChangesAsync();
    }

    public async Task SoftDeleteAsync(BrandEntity brand, Guid? deletedBy)
    {
        DateTime deletedAt = DateTime.UtcNow;
        brand.DeletedAt = deletedAt;
        brand.UpdatedAt = deletedAt;
        brand.DeletedBy = deletedBy;
        db.Brands.Update(brand);
        await db.SaveChangesAsync();
    }

    public async Task UpdateAsync(BrandEntity brand)
    {
        brand.UpdatedAt = DateTime.UtcNow;

        db.Brands.Update(brand);
        await db.SaveChangesAsync();
    }

    public async Task<(List<BrandEntity> Items, int TotalCount)> GetBrandListAsync(
        int page,
        int pageSize,
        string? search,
        string? sortBy,
        SortDirection? sortDirection,
        bool? isActive)
    {
        IQueryable<BrandEntity> query = db.Brands.AsNoTracking().Where(item => item.DeletedAt == null);

        if (isActive != null)
        {
            query = query.Where(item => item.IsActive == isActive);
        }

        query = ApplySearchQuery(query, search, [
            item => item.Name,
            item => item.Slug,
            item => item.Description]);

        query = ApplySortQuery(query, sortBy, sortDirection);

        int totalCount = await query.CountAsync();
        List<BrandEntity> items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, totalCount);
    }

    public async Task<BrandEntity?> GetByIdAsync(int id)
    {
        return await db.Brands.AsNoTracking().FirstOrDefaultAsync(item => item.Id == id && item.DeletedAt == null);
    }

    public async Task<BrandEntity?> GetByIdIncludingDeletedAsync(int id)
    {
        return await db.Brands.AsNoTracking().FirstOrDefaultAsync(item => item.Id == id);
    }

    public async Task<bool> ExistsAsync(string name, string slug, int? excludedId = null)
    {
        return await db.Brands.AnyAsync(item =>
            (excludedId == null || item.Id != excludedId) &&
            (item.Name == name || item.Slug == slug));
    }

}
