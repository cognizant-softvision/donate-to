using System;
using System.Collections.Generic;

namespace DonateTo.ApplicationCore.Entities
{
    public class DonationRequest : Entity<int>
    {
        public string Title { get; set; }
        public string Observation { get; set; }
        public int Priority { get; set; }
        public Organization Organization { get; set; }
        public Address Address { get; set; }
        public Status Status { get; set; }
        public User User { get; set; }
        public IEnumerable<DonationRequestItem> DonationRequestItems { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime EditedTime { get; set; }
        public DateTime FinishDate { get; set; }
    }
}
