using System.Collections.Generic;
using System.ComponentModel;

namespace DonateTo.IdentityServer.Models
{
    public class UserRoleViewModel
    {
        public long Id { get; set; }
        [DisplayName("Full Name")]
        public string FullName { get; set; }
        public string Email { get; set; }
        public List<RoleModelView> Roles { get; set; }
    }
}
