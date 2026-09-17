namespace Vexa.Application.Mappings;

public class CategoryMappingProfile : Profile
{
    public CategoryMappingProfile()
    {
        CreateMap<CreateCategoryRequest, Category>();
        CreateMap<UpdateCategoryRequest, Category>();

        CreateMap<Category, CategoryResponse>();
        CreateMap<Category, CategoryDetailResponse>();
    }
}
