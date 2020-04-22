using System;

namespace DonateTo.ApplicationCore.Entities
{
    public class DonationItem : Entity<int>
    {
        public decimal Quantity { get; set; }
        public string Observation { get; set; }
        public Donation Donation { get; set; }
        public DonationRequestItem DonationRequestItem { get; set; }
        public Unit Unit { get; set; }
        public Status Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime EditedTime { get; set; }
    }
}
