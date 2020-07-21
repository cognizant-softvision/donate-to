using System;

namespace DonateTo.ApplicationCore.Models.Filtering
{
    public class DonationRequestFilterModel : BaseFilterModel
    {
        public string Title { get; set; }
        public DateTime CreatedDateBegin { get; set; }
        public DateTime CreatedDateEnd { get; set; }
        public DateTime FinishDateBegin { get; set; }
        public DateTime FinishDateEnd { get; set; }
        public string Observation { get; set; }
    }
}
