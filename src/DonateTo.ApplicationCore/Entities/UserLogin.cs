using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace DonateTo.ApplicationCore.Entities
{
    public class UserLogin : IdentityUserLogin<long>
    {
        public virtual User User { get; set; }
    }
}
