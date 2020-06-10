using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using IdentityServer4.EntityFramework.Entities;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel;

namespace DonateTo.IdentityServer.Models
{
    public class ClientRegistrationViewModel
    {
        [DisplayName("Allowed Cors Origins")]
        public Dictionary<string, string>[] AllowedCorsOrigins { get; set; }
        public DateTime Created { get; set; }
        public DateTime? Updated { get; set; }
        public Dictionary<string, string>[] Claims { get; set; }

        [DisplayName("Allowed Scopes")]
        public Dictionary<string, string>[] AllowedScopes { get; set; }
        public int Id { get; set; }

        [DisplayName("Client Id")]
        [Required(ErrorMessage = "Client Id is required")]
        public string ClientId { get; set; }

        [DisplayName("Client Secrets")]
        public Dictionary<string, string>[] ClientSecrets { get; set; }

        [DisplayName("Client Name")]
        [Required(ErrorMessage = "Client name is required")]
        public string ClientName { get; set; }
        public string Description { get; set; }
        [DisplayName("Allowed Grant Types")]
        public Dictionary<string, string>[] AllowedGrantTypes { get; set; }

        [DisplayName("Redirect Uris")]
        public Dictionary<string, string>[] RedirectUris { get; set; }

        [DisplayName("Post Logout Redirect Uris")]
        public Dictionary<string, string>[] PostLogoutRedirectUris { get; set; }


    }
}
