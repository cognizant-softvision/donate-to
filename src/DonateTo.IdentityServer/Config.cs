using IdentityServer4.Models;
using System.Collections.Generic;

namespace DonateTo.IdentityServer
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> IdentityResources => new List<IdentityResource>
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile()
        };
        
    }
}
