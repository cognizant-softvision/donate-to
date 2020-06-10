using Microsoft.AspNetCore.Identity;

namespace DonateTo.ApplicationCore.Entities
{
    public class UserLogin : IdentityUserLogin<long>
    {
        public virtual User User { get; set; }
    }
}
