using System.Collections.Generic;

namespace DonateTo.ApplicationCore.Entities
{
    public class Organization : EntityBase
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string ContactName { get; set; }
        public string ContactPhone { get; set; }
        public string ContactPosition { get; set; }
        public string ContactEmail { get; set; }
        public IEnumerable<UserOrganization> UserOrganizations { get; set; }
    }
}
