using DonateTo.ApplicationCore.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IOrganizationService : IBaseService<Organization>
    {
        /// <summary>
        /// Get a list of Organizations from an spesific User Id.
        /// </summary>
        /// <param name="userId">User Id</param>
        /// <returns>IEnumerable of Organization.</returns>
        IEnumerable<Organization> GetByUserId(long userId);

        /// <summary>
        /// Get a list of Organizations from an spesific User Id async.
        /// </summary>
        /// <param name="userId">User Id</param>
        /// <returns>IEnumerable of User.</returns>
        Task<IEnumerable<Organization>> GetByUserIdAsync(long userId);
    }
}
