using System;
using System.Collections.Generic;

namespace DonateTo.ApplicationCore.Entities
{
    public class DonationRequestCategory
    {
       public long DonationRequestId { get; set; }
       public DonationRequest DonationRequest { get; set; }

       public long CategoryId { get; set; }
       public Category Category { get; set; }

    }
}
