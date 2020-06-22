using System.ComponentModel.DataAnnotations;

namespace DonateTo.IdentityServer.Models
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string ReturnUrl { get; set; }
    }
}
