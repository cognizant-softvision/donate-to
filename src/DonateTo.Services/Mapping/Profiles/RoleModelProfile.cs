using AutoMapper;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Models;

namespace DonateTo.Services.Mapping.Profiles
{
    public class RoleModelProfile : Profile
    {
        public RoleModelProfile()
        {
            CreateMap<Role, RoleModel>();

            CreateMap<UserRole, RoleModel>()
                .ForMember(m => m.Id, opt => opt.MapFrom(src => src.RoleId))
                .ForMember(m => m.Name, opt => opt.MapFrom(src => src.Role != null ? src.Role.Name : ""))
                .ReverseMap()
                .ForMember(m => m.RoleId, opt => opt.MapFrom(src => src.Id));
        }
    }
}
