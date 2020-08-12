namespace DonateTo.ApplicationCore.Models.Filtering
{
    public class DonationFilterModel : BaseFilterModel
    {
        public string ItemName { get; set; }
        public string DonationRequestId { get; set; }
    }
}
