using DonateTo.ApplicationCore.Entities;
using System.Collections.Generic;

namespace DonateTo.ApplicationCore.Models
{
    public class OrganizationModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Contact Contact { get; set; }
        public IEnumerable<Address> Addresses { get; set; }
    }
}
