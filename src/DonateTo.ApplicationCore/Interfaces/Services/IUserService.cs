using DonateTo.ApplicationCore.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IUserService : IBaseService<User>
    {
        /// <summary>
        /// Associates user to an Organization.
        /// </summary>
        /// <param name="userId"> Long user Id <param>
        /// <param name="organizationId"> Long organization Id <param>
        /// <returns>Action Result of UserOrganization</returns>
        Task<ActionResult<User>> AssociateUserToOrganization(long userId, long organizationId);
    }

}
