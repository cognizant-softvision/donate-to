using DonateTo.ApplicationCore.Entities;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IDonationService : IBaseService<Donation>
    {
        /// <summary>
        /// Creates Hydrated donation
        /// </summary>
        /// <param name="donation">donation</param>
        /// <returns>Donation</returns>
        Task<Donation> CreateHydratedAsync(Donation donation);
    }
}