using AutoMapper;
using DonateTo.ApplicationCore.Entities;
using DonateTo.IdentityServer.Models;

namespace DonateTo.IdentityServer.Mapping
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<UserRegistrationViewModel, User>();
        }
    }
}
