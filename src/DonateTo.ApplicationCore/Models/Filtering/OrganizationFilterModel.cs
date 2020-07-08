namespace DonateTo.ApplicationCore.Models.Filtering
{
    public class OrganizationFilterModel : BaseFilterModel
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string ContactName { get; set; }
    }
}
