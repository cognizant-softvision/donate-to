namespace DonateTo.ApplicationCore.Entities
{
    public class Role : Entity<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
