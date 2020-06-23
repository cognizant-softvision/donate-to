using DonateTo.ApplicationCore.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IUserService : IBaseService<User>
    {
        /// <summary>
        /// Get a list of User from an spesific Organization Id.
        /// </summary>
        /// <param name="organizationId">Organization Id</param>
        /// <returns>IEnumerable of User.</returns>
        IEnumerable<User> GetByOrganizationId(long organizationId);

        /// <summary>
        /// Get a list of User from an spesific Organization Id async.
        /// </summary>
        /// <param name="organizationId">Organization Id</param>
        /// <returns>IEnumerable of User.</returns>
        Task<IEnumerable<User>> GetByOrganizationIdAsync(long organizationId);

        /// <summary>
        /// Update an user linked organizations.
        /// </summary>
        /// <param name="organizationId">Organization Id</param>
        /// <param name="userId">User Id.</param>
        /// <param name="organizationsId">Organizations id list.</param>
        void UpdateUserOrganizations(long userId, IEnumerable<long> organizationsId, string username = null);

        /// <summary>
        /// Update an user linked organizations async.
        /// </summary>
        /// <param name="userId">User Id.</param>
        /// <param name="organizationsId">Organizations id list.</param>
        Task UpdateUserOrganizationsAsync(long userId, IEnumerable<long> organizationsId, string username = null);
    }
}
