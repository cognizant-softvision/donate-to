using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Models.Filtering;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IDonationRequestItemService : IBaseService<DonationRequestItem, BaseFilterModel>
    {
        /// <summary>
        /// Soft deletes a Donation Request Item
        /// </summary>
        /// <param name="donationRequestItemId">DonationRequestItem Id</param>
        /// <returns></returns>
        Task SoftDelete(long donationRequestItemId);

        /// <summary>
        /// Send Deleted request item info mail to all donors
        /// </summary>
        /// <param name="users">IEnumerable<Users></param>
        /// <param name="client">Client</param>
        /// <returns></returns>
        public Task SendDeletedDonationRequestItemMailAsync(DonationRequestItem donationRequestItem, IEnumerable<User> users, string client);
    }
}
