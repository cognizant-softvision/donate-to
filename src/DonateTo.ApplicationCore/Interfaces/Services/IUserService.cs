using DonateTo.ApplicationCore.Entities;

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
        User AssociateUserToOrganization(long userId, long organizationId);
    }

}
