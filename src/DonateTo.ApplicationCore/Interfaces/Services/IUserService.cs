using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IUserService : IGetService<UserModel>
    {
        /// <summary>
        /// Get a list of User from an spesific Organization Id.
        /// </summary>
        /// <param name="organizationId">Organization Id</param>
        /// <returns>IEnumerable of User.</returns>
        IEnumerable<UserModel> GetByOrganizationId(long organizationId);

        /// <summary>
        /// Get a list of User from an spesific Organization Id async.
        /// </summary>
        /// <param name="organizationId">Organization Id</param>
        /// <returns>IEnumerable of User.</returns>
        Task<IEnumerable<UserModel>> GetByOrganizationIdAsync(long organizationId);

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

        /// <summary>
        /// First or default User matching filter
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        User FirstOrDefault(Expression<Func<User, bool>> filter);

        /// <summary>
        /// First or default user matching filter async
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        Task<User> FirstOrDefaultAsync(Expression<Func<User, bool>> filter);

        /// <summary>
        /// Update a user
        /// </summary>
        /// <param name="user">Entity.</param>
        /// <param name="id">Id.</param>
        /// <param name="username">Username.</param>
        UserModel Update(UserModel user, long id, string username);

        /// <summary>
        /// Update a user async.
        /// </summary>
        /// <param name="user">Entity.</param>
        /// <param name="id">Id.</param>
        /// <param name="username">Username.</param>
        /// <returns>Task.</returns>
        Task<UserModel> UpdateAsync(UserModel user, long id, string username);
    }
}
