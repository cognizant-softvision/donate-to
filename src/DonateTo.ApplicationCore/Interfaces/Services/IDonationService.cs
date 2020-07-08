using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Models;
using DonateTo.ApplicationCore.Models.Filtering;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IDonationService : IBaseService<Donation, BaseFilterModel>
    {
        /// <summary>
        /// Send Created donation info mail to user
        /// </summary>
        /// <param name="donation">Donation</param>
        /// <param name="client">Client</param>
        /// <returns></returns>
        Task SendNewDonationMailAsync(Donation donation, UserModel user, string client);
    }
}
