using AutoMapper;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Models;

namespace DonateTo.Services.Mapping.Profiles
{
    public class UserModelProfile : Profile
    {
        public UserModelProfile()
        {
            CreateMap<User, UserModel>()
                .ForMember(m => m.Roles, opt => opt.MapFrom(src => src.UserRoles))
                .ForMember(m => m.Organizations, opt => opt.MapFrom(src => src.UserOrganizations))
                .ReverseMap()
                .ForMember(m => m.UserRoles, opt => opt.MapFrom(src => src.Roles))
                .ForMember(m => m.UserOrganizations, opt => opt.MapFrom(src => src.Organizations));
        }
    }
}
