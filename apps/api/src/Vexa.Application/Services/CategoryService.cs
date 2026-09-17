namespace Vexa.Application.Services;

public class CategoryService : ICategoryService
{
    public Task<CategoryDetailResponse> CreateCategoryAsync(CreateCategoryRequest request)
    {
        throw new NotImplementedException();
    }

    public Task<CategoryDetailResponse> UpdateCategoryAsync(int id, UpdateCategoryRequest request)
    {
        throw new NotImplementedException();
    }

    public Task DeleteCategoryAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<PaginationResponse<CategoryResponse>> GetCategoriesAsync(PaginationRequest request)
    {
        throw new NotImplementedException();
    }

    public Task<CategoryDetailResponse?> GetCategoryByIdAsync(int id)
    {
        throw new NotImplementedException();
    }
}
