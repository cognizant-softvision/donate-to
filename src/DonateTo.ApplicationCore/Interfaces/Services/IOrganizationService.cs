using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Models;
using DonateTo.ApplicationCore.Models.Filtering;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IOrganizationService : IBaseService<Organization, OrganizationFilterModel>
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

        /// <summary>
        /// Soft deletes an Organization
        /// </summary>
        /// <param name="organization">Organization</param>
        /// <returns></returns>
        Task SoftDelete(Organization organization);

        /// <summary>
        /// Soft deletes an Address
        /// </summary>
        /// <param name="address">Address</param>
        /// <returns></returns>
        Task SoftDeleteAddress(Address address);

        /// <summary>
        /// Send Deleted organization info mail to owner of this organization
        /// </summary>
        /// <param name="user">IEnumerable<Users></Users></param>
        /// <param name="client">Client</param>
        /// <returns></returns>
        Task SendDeletedOrganizationMailAsync(Contact contact, string client);

    }
}
