namespace DonateTo.ApplicationCore.Entities
{
    public class Unit : Entity<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
    }
}
