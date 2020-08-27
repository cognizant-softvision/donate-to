using DonateTo.ApplicationCore.Entities;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Repositories
{
    public interface IDonationRepository : IRepository<Donation>
    {
        Task SoftDeleteDonation(Donation donation);
    }
}
