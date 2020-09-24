using DonateTo.ApplicationCore.Interfaces;
using System.Collections.Generic;

namespace DonateTo.ApplicationCore.Entities
{
    public class DonationRequestItem : EntityBase, IIsDeleted
    {
        public string Name { get; set; }
        public string Observation { get; set; }
        public decimal CurrentQuantity { get; set; }
        /// <summary>
        /// Requested quantity
        /// </summary>
        public decimal FinishQuantity { get; set; }
        public long UnitId { get; set; }
        public Unit Unit { get; set; }       
        public IEnumerable<DonationRequestItemCategory> DonationRequestItemCategories { get; set; }
        public bool IsDeleted { get; set; }
        public long DonationRequestId { get; set; }
    }
}
