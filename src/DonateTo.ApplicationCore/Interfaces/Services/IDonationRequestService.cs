using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Models;
using DonateTo.ApplicationCore.Models.Filtering;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IDonationRequestService : IBaseService<DonationRequest, DonationRequestFilterModel>
    {
        /// <summary>
        /// Send Created request info mail to all users of the organization
        /// </summary>
        /// <param name="donationRequest">DonationRequest</param>
        /// <param name="users">IEnumerable<Users></Users></param>
        /// <param name="client">Client</param>
        /// <returns></returns>
        Task SendNewRequestMailToOrganizationUsersAsync(DonationRequest donationRequest, IEnumerable<UserModel> users, string client);

        /// <summary>
        /// Send Deleted request info mail to all users of the organization
        /// </summary>
        /// <param name="donationRequest">DonationRequest</param>
        /// <param name="users">IEnumerable<Users></Users></param>
        /// <param name="client">Client</param>
        /// <returns></returns>
        Task SendDeleteRequestMailToOrganizationUsersAsync(DonationRequest donationRequest, IEnumerable<UserModel> users, string client);

        /// <summary>
        /// Soft deletes a Donation Request
        /// </summary>
        /// <param name="donationRequest">DonationRequest</param>
        /// <returns></returns>
        Task SoftDelete(DonationRequest donationRequest);
    }
}
