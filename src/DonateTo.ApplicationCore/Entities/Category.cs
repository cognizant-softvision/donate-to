namespace DonateTo.ApplicationCore.Entities
{
    public class Category : Entity<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
