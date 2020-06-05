using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;

namespace DonateTo.Services
{
    public class DonationRequestService: BaseService<DonationRequest>
    {
        public DonationRequestService(IRepository<DonationRequest> donationRequestRepository): base(donationRequestRepository)
        {
        }
    }
}
