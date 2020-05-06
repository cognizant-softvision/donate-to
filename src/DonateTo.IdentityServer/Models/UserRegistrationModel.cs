using System.ComponentModel.DataAnnotations;

namespace DonateTo.IdentityServer.Models
{
    public class UserRegistrationModel
    {
        [Required(ErrorMessage = "FirstName is required")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "LastName is required")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress]
        public string Email { get; set; }

        public string UserName => Email;

        public string IdentityNumber { get; set; }

        public string Phone { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$", ErrorMessage = "Password entry does not meet criteria.")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Password entries do not match.")]
        public string ConfirmPassword { get; set; }
    }
}
