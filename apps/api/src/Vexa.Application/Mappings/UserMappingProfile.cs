namespace Vexa.Application.Mappings;

public class UserMappingProfile : Profile
{
    public UserMappingProfile()
    {
        CreateMap<UserEntity, UserResponse>();
        CreateMap<UserEntity, CreateUserResponse>();
    }
}
