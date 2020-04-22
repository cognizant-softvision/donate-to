namespace DonateTo.ApplicationCore.Entities
{
    public class User : Entity<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string IdentityNumber { get; set; }
        public bool IsEnabled { get; set; }
        public Role Role { get; set; }
    }
}
