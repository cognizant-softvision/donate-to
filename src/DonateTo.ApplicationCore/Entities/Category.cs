using System.Collections.Generic;

namespace DonateTo.ApplicationCore.Entities
{
    public class Category : EntityBase
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public IEnumerable<DonationRequestCategory> DonationRequestCategories {get;}
        public IEnumerable<DonationRequestItemCategory> DonationRequestItemCategories {get;}      
    }
}
