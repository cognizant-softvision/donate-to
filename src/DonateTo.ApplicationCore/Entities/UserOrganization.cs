namespace DonateTo.ApplicationCore.Entities
{
    public class UserOrganization
    {
        public long UserId { get; set; }
        public User User { get; set; }
        public long OrganizationId { get; set; }
        public Organization Organization { get; set; }
    }
}
