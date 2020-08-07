using DonateTo.IdentityServer.Models;
using System.Threading.Tasks;

namespace DonateTo.IdentityServer.Services.Interfaces
{
    public interface IUserRoleService
    {
        /// <summary>
        /// Gets a specific User with a list of all available roles. 
        /// The roles assigned to the user will be selected on the list.
        /// </summary>
        /// <param name="id">Id of the User to retrieve</param>
        /// <returns>A list of clients</returns>
        Task<UserRoleViewModel> GetAsync(int idUser);

        /// <summary>
        /// Updates the roles assigned for a specific user.
        /// </summary>
        /// <param name="userRoleViewModel"></param>
        /// <returns></returns>
        Task UpdateAsync(UserRoleViewModel userRoleViewModel);
    }
}
