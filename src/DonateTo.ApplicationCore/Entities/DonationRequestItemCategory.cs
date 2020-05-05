using System;
using System.Collections.Generic;

namespace DonateTo.ApplicationCore.Entities
{
    public class DonationRequestItemCategory
    {
       public long DonationRequestItemId { get; set; }
       public DonationRequestItem DonationRequestItem { get; set; }

       public long CategoryId { get; set; }
       public Category Category { get; set; }

    }
}
