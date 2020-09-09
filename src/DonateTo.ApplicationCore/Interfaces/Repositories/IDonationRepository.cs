using DonateTo.ApplicationCore.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Repositories
{
    public interface IDonationRepository : IRepository<Donation>
    {
        Task SoftDeleteDonation(Donation donation);
        IEnumerable<User> GetDonors(long donationRequestItemId);
        Task SoftDeleteAvailability(long availabilityId);
    }
}
