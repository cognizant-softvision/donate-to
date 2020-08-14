using System.ComponentModel.DataAnnotations;

namespace DonateTo.IdentityServer.Models
{
    public class ChangePasswordViewModel
    {
        public string ReturnUrl { get; set; }

        [Required(ErrorMessage = "Current password is required")]
        public string CurrentPassword { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$", ErrorMessage = "Password entry does not meet criteria.")]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Compare("NewPassword", ErrorMessage = "Password entries do not match.")]
        public string ConfirmNewPassword { get; set; }
    }
}
