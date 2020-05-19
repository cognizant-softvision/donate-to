using DonateTo.ApplicationCore.Entities;
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
        /// <returns>Task of User</returns>
        Task<User> AssociateUserToOrganization(long userId, long organizationId);
    }

}
