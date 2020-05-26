using Microsoft.AspNetCore.Identity;

namespace DonateTo.ApplicationCore.Entities
{
    public class RoleClaim : IdentityRoleClaim<long>
    {
        public virtual Role Role { get; set; }
    }
}
