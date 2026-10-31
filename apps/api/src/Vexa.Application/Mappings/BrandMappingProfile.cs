namespace Vexa.Application.Mappings;

public class BrandMappingProfile : Profile
{
    public BrandMappingProfile()
    {
        CreateMap<CreateBrandRequest, BrandEntity>();
        CreateMap<UpdateBrandRequest, BrandEntity>();

        CreateMap<BrandEntity, BrandResponse>();
        CreateMap<BrandEntity, BrandDetailResponse>();
    }
}
