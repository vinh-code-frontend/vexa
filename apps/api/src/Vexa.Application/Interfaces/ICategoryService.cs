namespace Vexa.Application.Interfaces;

public interface ICategoryService
{
    Task<CategoryDetailResponse> AddAsync(CreateCategoryRequest request);
    Task<CategoryDetailResponse> UpdateAsync(int id, UpdateCategoryRequest request);
    Task DeleteAsync(int id);
    Task<ListResponse<CategoryResponse>> GetAsync(CategoryListRequest request);
    Task<CategoryDetailResponse?> GetDetailAsync(int id);
}
