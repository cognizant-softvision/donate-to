using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using IdentityServer4.EntityFramework.Entities;

namespace DonateTo.IdentityServer.Models
{
    public class ClientListViewModel
    {
        public IEnumerable<ClientListItem> ClientItems { get; set; }
   
    }
}
