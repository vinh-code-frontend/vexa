namespace Vexa.Application.Services;

public class CategoryService(ICategoryRepository categoryRepository, IMapper mapper, ICurrentUserService currentUserService) : ICategoryService
{
    public async Task<ListResponse<CategoryResponse>> GetAsync(CategoryListRequest request)
    {
        int take = request.PageSize + 1;
        List<Category> items = await categoryRepository.GetListAsync(
            take,
            request.Skip,
            request.Search,
            request.SortBy,
            request.SortDirection,
            request.ParentId
        );

        string? nextLink = null;

        if (items.Count > request.PageSize)
        {
            items.RemoveAt(items.Count - 1);
            nextLink = NextLinkHelper.Build(
                "categories",
                request.PageSize,
                request.Skip + request.PageSize,
                request.Search,
                request.SortBy,
                request.SortDirection.ToString(),
                request.ParentId
            );
        }

        return new ListResponse<CategoryResponse>()
        {
            Items = [.. items.Select(mapper.Map<CategoryResponse>)],
            NextLink = nextLink
        };
    }

    public async Task<CategoryDetailResponse?> GetDetailAsync(int id)
    {
        Category? item = await categoryRepository.GetByIdAsync(id);

        return mapper.Map<CategoryDetailResponse>(item);
    }
    public async Task<CategoryDetailResponse> AddAsync(CreateCategoryRequest request)
    {
        Category category = mapper.Map<Category>(request);

        category.Name = request.Name.Trim();
        category.Slug = SlugHelper.GenerateSlug(category.Name);

        if (await categoryRepository.ExistsAsync(category.Name, category.Slug))
        {
            throw new ConflictException("Category name or slug already exists!");
        }

        await categoryRepository.AddAsync(category);

        return mapper.Map<CategoryDetailResponse>(category);
    }

    public Task<CategoryDetailResponse> UpdateAsync(int id, UpdateCategoryRequest request)
    {
        throw new NotImplementedException();
    }

    public async Task DeleteAsync(int id)
    {
        Category? category = await categoryRepository.GetByIdAsync(id, includeDeleted: true);

        if (category is null)
        {
            throw new NotFoundException("Category not found!");
        }
        if (category.DeletedAt != null)
        {
            throw new ConflictException("Category has already been deleted!");
        }
        await categoryRepository.SoftDeleteAsync(category, currentUserService.UserId);

    }
}
