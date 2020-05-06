using System;

namespace DonateTo.ApplicationCore.Entities
{
    public class DonationItem : EntityBase
    {
        public decimal Quantity { get; set; }
        public string Observation { get; set; }
        public long DonationId { get; set; }
        public Donation Donation { get; set; }
        public long DonationRequestItemId { get; set; }
        public DonationRequestItem DonationRequestItem { get; set; }
        public Unit Unit { get; set; }
        public long StatusId { get; set; }
        public Status Status { get; set; }
    }
}
