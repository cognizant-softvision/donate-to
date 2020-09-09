using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Models;
using DonateTo.ApplicationCore.Models.Filtering;
using DonateTo.ApplicationCore.Models.Pagination;
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
        /// Get Donation Request filtered by user role
        /// </summary>
        /// <param name="filter">DonationRequestFilterModel</param>
        /// <param name="userId">long</Users></param>
        /// <returns></returns>
        Task<PagedResult<DonationRequest>> GetPagedFilteredByOrganizationAsync(DonationRequestFilterModel filter, long userId);

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
        /// <param name="donationRequestId">DonationRequest Id</param>
        /// <returns></returns>
        Task SoftDelete(long donationRequestId);
    }
}
