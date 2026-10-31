namespace Vexa.Application.Mappings;

public class CategoryMappingProfile : Profile
{
    public CategoryMappingProfile()
    {
        CreateMap<CreateCategoryRequest, CategoryEntity>();
        CreateMap<UpdateCategoryRequest, CategoryEntity>();

        CreateMap<CategoryEntity, CategoryResponse>();
        CreateMap<CategoryEntity, CategoryDetailResponse>();
    }
}
