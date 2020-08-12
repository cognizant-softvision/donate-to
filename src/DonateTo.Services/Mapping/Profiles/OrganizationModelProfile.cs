using AutoMapper;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Models;
using System;

namespace DonateTo.Services.Mapping.Profiles
{
    public class OrganizationProfile : Profile
    {
        public OrganizationProfile() 
        {
            CreateMapOrganizationToOrganizationModel(this);
        }

        public static void CreateMapOrganizationToOrganizationModel(Profile profile)
        {
            profile.CreateMap<UserOrganization, OrganizationModel>()
               .ForMember(m => m.Id, opt => opt.MapFrom(src => src.OrganizationId))
               .ForMember(m => m.Name, opt => opt.MapFrom(src => src.Organization.Name))
               .ForMember(m => m.Contact, opt => opt.MapFrom(src => src.Organization.Contact))
               .ForMember(m => m.Addresses, opt => opt.MapFrom(src => src.Organization.Addresses))
               .ReverseMap();
        }
    }
}
