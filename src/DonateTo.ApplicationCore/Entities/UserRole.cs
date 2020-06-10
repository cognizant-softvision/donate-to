using Microsoft.AspNetCore.Identity;

namespace DonateTo.ApplicationCore.Entities
{
    public class UserRole : IdentityUserRole<long>
    {
        public virtual User User { get; set; }
        public virtual Role Role { get; set; }
    }
}
