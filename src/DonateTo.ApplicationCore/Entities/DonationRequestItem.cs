using System.Collections.Generic;

namespace DonateTo.ApplicationCore.Entities
{
    public class DonationRequestItem : EntityBase
    {
        public string Name { get; set; }
        public string Observation { get; set; }
        public decimal CurrentQuantity { get; set; }
        public decimal FinishQuantity { get; set; }         
        public long UnitId { get; set; }
        public Unit Unit { get; set; }
        public IEnumerable<DonationRequestItemCategory> DonationRequestItemCategories { get; set; }  
    }
}
