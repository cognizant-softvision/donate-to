using DonateTo.ApplicationCore.Entities;
using System;
using System.Collections.Generic;

namespace DonateTo.ApplicationCore.Models
{
    public class UserModel
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string FullName { get => FirstName + " " + LastName; }
        public string IdentityNumber { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsEnabled { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public IEnumerable<RoleModel> Roles { get; set; }
        public IEnumerable<OrganizationModel> Organizations { get; set; }

    }
}
