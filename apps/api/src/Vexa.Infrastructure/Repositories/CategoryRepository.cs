using Vexa.Application.Interfaces;

namespace Vexa.Infrastructure.Repositories;

public class CategoryRepository(AppDbContext db) : BaseRepository<Category>(db), ICategoryRepository
{
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

    public async Task<List<Category>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<Category?> GetByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }


}
