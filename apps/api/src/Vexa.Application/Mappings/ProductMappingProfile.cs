namespace Vexa.Application.Mappings;

public class ProductMappingProfile : Profile
{
    public ProductMappingProfile()
    {
        CreateMap<CreateProductRequest, ProductEntity>();
        CreateMap<UpdateProductRequest, ProductEntity>();
        CreateMap<ProductEntity, ProductResponse>();
        CreateMap<ProductEntity, ProductDetailResponse>();
    }
}
