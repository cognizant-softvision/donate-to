using System.Collections.Generic;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Entities;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IAddressService : IBaseService<Address>
    {

        /// <summary>
        /// Get a list of Addresses associated with an Organization Id.
        /// </summary>
        /// <param name="organizationId">Organization id.</param>
        /// <returns>IEnumerable of Addresses.</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Naming", "CA1716:Identifiers should not match keywords", Justification = "<Pending>")]
        IEnumerable<Address> GetByOrganizationId(long organizationId);

        /// <summary>
        /// Get a list of Addresses associated with an Organization Id async.
        /// </summary>
        /// <param name="organizationId">Organization id.</param>
        /// <returns>IEnumerable of Addresses.</returns>
        Task<IEnumerable<Address>> GetByOrganizationIdAsync(long organizationId);
    }
}