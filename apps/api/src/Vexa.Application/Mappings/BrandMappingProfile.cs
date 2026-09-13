namespace Vexa.Application.Mappings;

public class BrandMappingProfile : Profile
{
    public BrandMappingProfile()
    {
        CreateMap<CreateBrandRequest, Brand>();
        CreateMap<UpdateBrandRequest, Brand>();

        CreateMap<Brand, BrandResponse>();
        CreateMap<Brand, BrandDetailResponse>();
    }
}
