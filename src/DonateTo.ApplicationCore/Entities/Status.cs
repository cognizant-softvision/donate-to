namespace DonateTo.ApplicationCore.Entities
{
    public class Status : Entity<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
