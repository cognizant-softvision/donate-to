using System;

namespace DonateTo.ApplicationCore.Entities
{
    public class DonationRequestItem : Entity<int>
    {
        public string Title { get; set; }
        public string Observation { get; set; }
        public decimal CurrentQuantity { get; set; }
        public decimal FinishQuantity { get; set; }
    }
}
