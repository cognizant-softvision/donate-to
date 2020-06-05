using Microsoft.AspNetCore.Identity;

namespace DonateTo.ApplicationCore.Entities
{
    public class UserToken : IdentityUserToken<long>
    {
        public virtual User User { get; set; }
    }
}
