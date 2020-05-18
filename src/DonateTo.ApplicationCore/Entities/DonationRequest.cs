using System;
using System.Collections.Generic;

namespace DonateTo.ApplicationCore.Entities
{
    public class DonationRequest : EntityBase
    {
        public string Title { get; set; }
        public string Observation { get; set; }
        public int Priority { get; set; }              
        public long OrganizationId { get; set; }
        public Organization Organization { get; set; }
        public long AddressId { get; set; }
        public Address Address { get; set; }
        public long StatusId { get; set; }
        public Status Status { get; set; }
        public long UserId { get; set; }
        public User User { get; set; }
        public IEnumerable<DonationRequestItem> DonationRequestItems { get; set; }
        public DateTime? FinishDate { get; set; }
        public IEnumerable<DonationRequestCategory> DonationRequestCategories { get; set; }        
    }
}
