using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace DonateTo.ApplicationCore.Entities
{
    public class UserRole : IdentityUserRole<long>
    {
        public virtual User User { get; set; }
        public virtual Role Role { get; set; }
    }
}
