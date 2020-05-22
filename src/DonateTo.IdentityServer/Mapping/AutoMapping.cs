using AutoMapper;
using DonateTo.ApplicationCore.Entities;
using DonateTo.IdentityServer.Models;
using System;

namespace DonateTo.IdentityServer.Mapping
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<UserRegistrationViewModel, User>()
                .ForMember(m => m.CreatedBy, opt => opt.MapFrom(src => $"{src.FirstName} {src.LastName}"))
                .ForMember(m => m.CreatedDate, opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForMember(m => m.UpdateBy, opt => opt.MapFrom(src => $"{src.FirstName} {src.LastName}"))
                .ForMember(m => m.UpdateDate, opt => opt.MapFrom(src => DateTime.UtcNow));
        }
    }
}
