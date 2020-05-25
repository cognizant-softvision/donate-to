using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Entities;

namespace DonateTo.ApplicationCore.Interfaces
{
    public interface IAddressRepository : IRepository<Address>
    {
        /// <summary>
        /// Get a list of Addresses associated with an Organization Id.
        /// </summary>
        /// <param name="organizationId">Filter</param>
        /// <returns>IEnumerable of Address.</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Naming", "CA1716:Identifiers should not match keywords", Justification = "<Pending>")]
        IQueryable<Address> GetByOrganizationId(long organizationId);

        /// <summary>
        /// Get a list of Addresses associated with an Organization Id.
        /// </summary>
        /// <param name="organizationId">Filter</param>
        /// <returns>Task of IQueryable of Address.</returns>
        Task<IQueryable<Address>> GetByOrganizationIdAsync(long organizationId);
    }
}
