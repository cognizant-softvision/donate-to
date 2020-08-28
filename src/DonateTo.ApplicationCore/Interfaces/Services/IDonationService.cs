using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Models;
using DonateTo.ApplicationCore.Models.Filtering;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IDonationService : IBaseService<Donation, DonationFilterModel>
    {
        /// <summary>
        /// Send Created donation info mail to user
        /// </summary>
        /// <param name="donation">Donation</param>
        /// <param name="client">Client</param>
        /// <returns></returns>
        Task SendNewDonationMailAsync(Donation donation, UserModel user, string client);

        /// <summary>
        /// Soft deletes a Donation
        /// </summary>
        /// <param name="donation">Donation</param>
        /// <returns></returns>
        Task SoftDelete(Donation donation);

        /// <summary>
        /// Gets donor by request item id and where the donation status is active
        /// </summary>
        /// <param name="donationRequestItemId">Donation Request Item Id</param>
        /// <returns></returns>
        IEnumerable<User> GetDonorsByDonationRequestItemId(long donationRequestItemId);
    }
}
