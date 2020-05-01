using System.ComponentModel.DataAnnotations;

namespace DonateTo.IdentityServer.Models
{
    public class UserRegistrationModel
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress]
        public string Email { get; set; }

        public string IdentityNumber { get; set; }

        public string Phone { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }
}
