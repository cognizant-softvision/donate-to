using DonateTo.ApplicationCore.Interfaces;
using System.Collections.Generic;

namespace DonateTo.ApplicationCore.Entities
{
    public class Organization : EntityBase, IIsDeleted
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public long ContactId { get; set; }
        public Contact Contact { get; set; }
        public IEnumerable<Address> Addresses { get; set; }
        public ICollection<UserOrganization> UserOrganizations { get; set; }
        public bool IsDeleted { get; set; }
    }
}
