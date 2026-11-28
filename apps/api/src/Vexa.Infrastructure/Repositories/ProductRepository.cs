using Vexa.Application.Interfaces;

namespace Vexa.Infrastructure.Repositories;

public class ProductRepository(AppDbContext db) : BaseRepository<ProductEntity>, IProductRepository
{
    public async Task AddAsync(ProductEntity product)
    {
        db.Products.Add(product);
        await db.SaveChangesAsync();
    }

    public async Task UpdateAsync(ProductEntity product)
    {
        product.UpdatedAt = DateTime.UtcNow;
        db.Products.Update(product);
        await db.SaveChangesAsync();
    }

    public async Task SoftDeleteAsync(ProductEntity product, Guid? deletedBy)
    {
        DateTime deletedAt = DateTime.UtcNow;
        product.DeletedAt = deletedAt;
        product.UpdatedAt = deletedAt;
        product.DeletedBy = deletedBy;
        db.Products.Update(product);
        await db.SaveChangesAsync();
    }

    public async Task<(List<ProductEntity> Items, int TotalCount)> GetProductListAsync(
        int page,
        int pageSize,
        string? search,
        string? sortBy,
        SortDirection? sortDirection,
        int? brandId,
        int? categoryId)
    {
        IQueryable<ProductEntity> query = db.Products.AsNoTracking().Where(item => item.DeletedAt == null);

        if (brandId != null)
        {
            query = query.Where(item => item.BrandId == brandId);
        }
        if (categoryId != null)
        {
            query = query.Where(item => item.CategoryId == categoryId);
        }

        query = ApplySearchQuery(query, search, [item => item.Name, item => item.Slug, item => item.Description]);
        query = ApplySortQuery(query, sortBy, sortDirection);

        int totalCount = await query.CountAsync();
        List<ProductEntity> items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, totalCount);
    }

    public async Task<ProductEntity?> GetByIdAsync(int id)
    {
        return await db.Products.AsNoTracking().FirstOrDefaultAsync(item => item.Id == id && item.DeletedAt == null);
    }

    public async Task<ProductEntity?> GetByIdIncludingDeletedAsync(int id)
    {
        return await db.Products.AsNoTracking().FirstOrDefaultAsync(item => item.Id == id);
    }

    public async Task<bool> ExistsAsync(string name, string slug, int? excludedId = null)
    {
        return await db.Products.AnyAsync(item =>
            (excludedId == null || item.Id != excludedId) &&
            (item.Name == name || item.Slug == slug));
    }

    public async Task<bool> ReferencesExistAsync(int brandId, int categoryId)
    {
        return await db.Brands.AnyAsync(item => item.Id == brandId && item.DeletedAt == null) &&
            await db.Categories.AnyAsync(item => item.Id == categoryId && item.DeletedAt == null);
    }
}
