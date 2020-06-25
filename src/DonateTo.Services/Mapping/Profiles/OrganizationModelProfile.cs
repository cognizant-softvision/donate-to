using AutoMapper;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Models;

namespace DonateTo.Services.Mapping.Profiles
{
    public class OrganizationProfile : Profile
    {
        public OrganizationProfile() 
        {
            CreateMap<UserOrganization, OrganizationModel>()
                .ForAllMembers(m => m.MapFrom(src => src.Organization));

            CreateMap<OrganizationModel, UserOrganization>()
                .ForMember(o => o.Organization, opt => opt.MapFrom(s => s));

        }
    }
}
