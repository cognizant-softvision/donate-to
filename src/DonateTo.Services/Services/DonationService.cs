using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;

namespace DonateTo.Services
{
    public class DonationService: BaseService<Donation>
    {
        public DonationService(IRepository<Donation> donationRepository):base(donationRepository)
        {
        }
    }
}
