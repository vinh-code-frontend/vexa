namespace Vexa.Application.Interfaces;

public interface ICategoryService
{
    Task GetCategoriesAsync();
    Task GetCategoryByIdAsync();
    Task CreateCategoryAsync();
    Task UpdateCategoryAsync();
    Task DeleteCategoryAsync();
}
