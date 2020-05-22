using Microsoft.AspNetCore.Identity;

namespace DonateTo.ApplicationCore.Entities
{
    public class UserClaim : IdentityUserClaim<long>
    {
        public virtual User User { get; set; }
    }
}
