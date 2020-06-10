using DonateTo.ApplicationCore.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces
{
    public interface IDonationItemRepository : IRepository<DonationItem>
    {
        /// <summary>
        /// Add IEnumerable of DonationItems
        /// </summary>
        /// <param name="donationItems">DonationItems</param>
        /// <returns>IEnumerable of inserted DonationItems</returns>
        Task<IEnumerable<DonationItem>> AddAllAsync(IEnumerable<DonationItem> donationItems);
    }
}
