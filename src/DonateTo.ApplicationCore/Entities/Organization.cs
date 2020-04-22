namespace DonateTo.ApplicationCore.Entities
{
    public class Organization : Entity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string ContactName { get; set; }
        public string ContactPhone { get; set; }
        public string ContactPosition { get; set; }
        public string ContactEmail { get; set; }
    }
}
