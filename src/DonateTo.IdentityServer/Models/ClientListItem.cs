using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using IdentityServer4.EntityFramework.Entities;

namespace DonateTo.IdentityServer.Models
{
    public class ClientListItem
    {
        public int Id { get; set; }
        public string ClientId { get; set; }
        public string ClientName { get; set; }
        public string Description { get; set; }
       
   
    }
}
