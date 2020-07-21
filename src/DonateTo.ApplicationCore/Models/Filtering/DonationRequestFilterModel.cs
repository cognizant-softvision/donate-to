namespace DonateTo.ApplicationCore.Models.Filtering
{
    public class DonationRequestFilterModel : BaseFilterModel
    {
        public string Title { get; set; }
        public string CreatedDateBegin { get; set; }
        public string CreatedDateEnd { get; set; }
        public string FinishDateBegin { get; set; }
        public string FinishDateEnd { get; set; }
        public string Observation { get; set; }
    }
}
