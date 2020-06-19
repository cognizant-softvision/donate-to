using DonateTo.ApplicationCore.Entities;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IDonationRequestService : IBaseService<DonationRequest>
    {
        /// <summary>
        /// Send Created request info mail to all users of the organization
        /// </summary>
        /// <param name="donationRequest">DonationRequest</param>
        /// <param name="client">Client</param>
        /// <returns></returns>
        Task SendNewRequestMailToOrganizationUsersAsync(DonationRequest donationRequest, string client);
    }
}
