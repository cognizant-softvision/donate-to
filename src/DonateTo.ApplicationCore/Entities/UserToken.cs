using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace DonateTo.ApplicationCore.Entities
{
    public class UserToken : IdentityUserToken<long>
    {
        public virtual User User { get; set; }
    }
}
