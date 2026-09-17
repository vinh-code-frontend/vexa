namespace Vexa.Application.Interfaces;

public interface ICategoryService
{
    Task<CategoryDetailResponse> CreateCategoryAsync(CreateCategoryRequest request);
    Task<CategoryDetailResponse> UpdateCategoryAsync(int id, UpdateCategoryRequest request);
    Task DeleteCategoryAsync(int id);
    Task<PaginationResponse<CategoryResponse>> GetCategoriesAsync(PaginationRequest request);
    Task<CategoryDetailResponse?> GetCategoryByIdAsync(int id);
}
