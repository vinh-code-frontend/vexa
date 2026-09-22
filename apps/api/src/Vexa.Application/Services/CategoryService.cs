namespace Vexa.Application.Services;

public class CategoryService : ICategoryService
{
    public Task<ListResponse<CategoryResponse>> GetAsync(CategoryListRequest request)
    {
        throw new NotImplementedException();
    }

    public Task<CategoryDetailResponse?> GetDetailAsync(int id)
    {
        throw new NotImplementedException();
    }
    public Task<CategoryDetailResponse> AddAsync(CreateCategoryRequest request)
    {
        throw new NotImplementedException();
    }

    public Task<CategoryDetailResponse> UpdateAsync(int id, UpdateCategoryRequest request)
    {
        throw new NotImplementedException();
    }

    public Task DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }
}
