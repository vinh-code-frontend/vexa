namespace Vexa.Infrastructure.Repositories;

public abstract class BaseRepository<TEntity> where TEntity : class
{
    protected readonly AppDbContext Db;
    protected readonly DbSet<TEntity> DbSet;

    protected BaseRepository(AppDbContext db)
    {
        Db = db;
        DbSet = db.Set<TEntity>();
    }
    protected async Task SaveChangesAsync()
    {
        await Db.SaveChangesAsync();
    }

    protected IQueryable<TEntity> Query() => DbSet.AsNoTracking();
}
