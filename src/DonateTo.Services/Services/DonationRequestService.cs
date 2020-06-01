using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;

namespace DonateTo.Services.Services
{
    public class DonationRequestService: BaseService<DonationRequest>
    {
        private readonly IRepository<DonationRequest> _donationRequestRepository;

        public DonationRequestService(IRepository<DonationRequest> donationRequestRepository): base(donationRequestRepository)
        {
            _donationRequestRepository = donationRequestRepository;
        }
    }
}
