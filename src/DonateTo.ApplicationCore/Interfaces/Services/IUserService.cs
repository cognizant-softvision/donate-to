using DonateTo.ApplicationCore.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IUserService : IBaseService<User>
    {
        /// <summary>
        /// Get a list of UserOrganizations from an spesific user.
        /// </summary>
        /// <param name="userId">User Id</param>
        /// <returns>IEnumerable of UserOrganizations.</returns>
        IEnumerable<UserOrganization> GetUserOrganizations(long userId);

        /// <summary>
        /// Get a list of UserOrganizations from an spesific user async.
        /// </summary>
        /// <param name="userId">User Id</param>
        /// <returns>IEnumerable of UserOrganizations.</returns>
        Task<IEnumerable<UserOrganization>> GetUserOrganizationsAsync(long userId);
    }
}
