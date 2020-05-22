using IdentityServer4.Models;
using System.Collections.Generic;

namespace DonateTo.IdentityServer
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> IdentityResources => new List<IdentityResource>
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
            new IdentityResource("roles", new[] { "role" })
        };

        public static IEnumerable<ApiResource> ApiResources => new List<ApiResource>
        {
            new ApiResource("donateapi", "Donate API"),
            new ApiResource("roles", "Roles"),
            new ApiResource("roles", new[] { "role" })
        };

        // Clients want to access resources (aka scopes)
        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "ro.client",
                    // AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                    AllowedScopes = { "donateapi","roles" }
                }
            };
        }

    }
}
