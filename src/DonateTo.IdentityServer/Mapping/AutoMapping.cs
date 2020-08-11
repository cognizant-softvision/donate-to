using AutoMapper;
using DonateTo.ApplicationCore.Entities;
using DonateTo.IdentityServer.Models;
using System;
using IdentityServer4.EntityFramework.Entities;
using System.Collections.Generic;
using System.Linq;
using DonateTo.Services.Mapping.Profiles;

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

            CreateMap<ClientRegistrationViewModel, Client>().ForMember(m => m.AllowedGrantTypes,
                    opt => opt.MapFrom(src => DictToObject<ClientGrantType>(src.AllowedGrantTypes))).
                ForMember(m => m.AllowedScopes,
                 opt => opt.MapFrom(src => DictToObject<ClientScope>(src.AllowedScopes))).
                ForMember(m => m.Claims,
                   opt => opt.MapFrom(src => DictToObject<ClientClaim>(src.Claims))).
                ForMember(m => m.RedirectUris,
                   opt => opt.MapFrom(src => DictToObject<ClientRedirectUri>(src.RedirectUris))).
                ForMember(m => m.PostLogoutRedirectUris,
                   opt => opt.MapFrom(src => DictToObject<ClientPostLogoutRedirectUri>(src.PostLogoutRedirectUris))).
                ForMember(m => m.AllowedCorsOrigins,
                   opt => opt.MapFrom(src => DictToObject<ClientCorsOrigin>(src.AllowedCorsOrigins))).
                ForMember(m => m.ClientSecrets,
                   opt => opt.MapFrom(src => DictToObject<ClientSecret>(src.ClientSecrets)));

            CreateMap<Client, ClientRegistrationViewModel>().
               ForMember(m => m.AllowedGrantTypes, opt => opt.MapFrom(src => ObjectToDict(src.AllowedGrantTypes))).
               ForMember(m => m.AllowedScopes, opt => opt.MapFrom(src => ObjectToDict(src.AllowedScopes))).
               ForMember(m => m.Claims, opt => opt.MapFrom(src => ObjectToDict(src.Claims))).
               ForMember(m => m.RedirectUris, opt => opt.MapFrom(src => ObjectToDict(src.RedirectUris))).
               ForMember(m => m.PostLogoutRedirectUris, opt => opt.MapFrom(src => ObjectToDict(src.PostLogoutRedirectUris))).
               ForMember(m => m.AllowedCorsOrigins, opt => opt.MapFrom(src => ObjectToDict(src.AllowedCorsOrigins))).
               ForMember(m => m.ClientSecrets, opt => opt.MapFrom(src => ObjectToDict(src.ClientSecrets)));

            CreateMap<ClientListItem, Client>();
            CreateMap<Client, ClientListItem>();
            UserModelProfile.CreateMapUserToUserModel(this);
            RoleModelProfile.CreateMapRoleToRoleModel(this);
            OrganizationProfile.CreateMapOrganizationToOrganizationModel(this);
            CreateMap<Role, RoleModelView>();
        }

        private Dictionary<string, string>[] ObjectToDict<T>(IEnumerable<T> objs)
        {
            var mapped = new List<Dictionary<string, string>>();
            foreach (var obj in objs)
            {
                var dict = new Dictionary<string, string>();
                var props = obj.GetType().GetProperties().Where(p => new Type[] { typeof(string), typeof(int) }.Contains(p.PropertyType));
                foreach (var prop in props)
                {
                    var val = prop.GetValue(obj);
                    dict.Add(prop.Name, val != null ? val.ToString() : null);
                }
                mapped.Add(dict);
            };
            return mapped.ToArray();
        }

        private List<T> DictToObject<T>(Dictionary<string, string>[] dicts) where T : class, new()
        {
            var mapped = new List<T>();
            if (dicts != null)
            {
                foreach (var dict in dicts)
                {
                    var obj = new T();
                    var props = typeof(T).GetProperties();
                    foreach (var prop in props)
                    {
                        if (dict.ContainsKey(prop.Name) && dict[prop.Name] != null)
                        {
                            if (prop.PropertyType == typeof(string))
                            {
                                prop.SetValue(obj, dict[prop.Name].ToString());
                            }
                            else if (prop.PropertyType == typeof(int))
                            {
                                prop.SetValue(obj, int.TryParse(dict[prop.Name], out int val) ? val : 0);
                            }
                        }
                    }
                    mapped.Add(obj);
                }
            }
            return mapped;
        }


    }
}
