using System.ComponentModel.DataAnnotations.Schema;

namespace DonateTo.ApplicationCore.Entities
{
    public class Contact : EntityBase
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string IdentityNumber { get; set; }
        public string PhoneNumber { get; set; }
        public string Position { get; set; }
        [NotMapped]
        public string FullName { get => FirstName + " " + LastName; }
    }
}
