using DonateTo.ApplicationCore.Entities;
using System.Collections.Generic;

namespace DonateTo.ApplicationCore.Models
{
    public class OrganizationModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public long ContactId { get; set; }
        public Contact Contact { get; set; }
        public IEnumerable<Address> Addresses { get; set; }
    }
}
