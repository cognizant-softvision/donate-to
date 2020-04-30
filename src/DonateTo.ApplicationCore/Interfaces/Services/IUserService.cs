using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Entities;
using Microsoft.AspNetCore.Identity;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IUserService
    {
        /// <summary>
        /// Create an user async.
        /// </summary>
        /// <param name="user">User.</param>
        /// <param name="password">Password.</param>
        /// <returns>User entity.</returns>
        Task<IdentityResult> CreateAsync(User user, string password);

        /// <summary>
        /// Create an user async.
        /// </summary>
        /// <param name="user">User.</param>        
        /// <returns>User entity.</returns>
        Task<User> CreateAsync(User user);

        /// <summary>
        ///     Create an user.
        /// </summary>
        /// <param name="user">User entity.</param>
        /// <returns>User.</returns>
        User Create(User user);

        /// <summary>
        ///     Get an user by id.
        /// </summary>
        /// <param name="id">User id.</param>
        /// <returns>User.</returns>
        User Get(int id);

        /// <summary>
        /// Get an user by id async.
        /// </summary>
        /// <param name="id">User id.</param>
        /// <returns>User.</returns>
        Task<User> GetAsync(int id);

        /// <summary>
        /// Update an user async.
        /// </summary>
        /// <param name="user">User entity.</param>
        /// <returns>Task.</returns>
        Task UpdateAsync(User user);
        
        /// <summary>
        /// Update an user.
        /// </summary>
        /// <param name="user">User.</param>
        void Update(User user);
        
        /// <summary>
        /// Delete an user async.
        /// </summary>
        /// <param name="id">User id.</param>
        /// <returns>Task.</returns>
        Task DeleteAsync(int id);
        
        /// <summary>
        /// Delete an user.
        /// </summary>
        /// <param name="id">User id.</param>
        void Delete(int id);
        
        /// <summary>
        /// Get a list of users
        /// </summary>
        /// <param name="filter">filter</param>
        /// <returns>IEnumerable of users.</returns>
        IEnumerable<User> Get(Expression<Func<User, bool>> filter);

        /// <summary>
        /// Get a list of users async.
        /// </summary>
        /// <param name="filter">filter</param>
        /// <returns>IEnumerable of User.</returns>
        Task<IEnumerable<User>> GetAsync(Expression<Func<User, bool>> filter);
        
        /// <summary>
        /// Get First or Default
        /// </summary>
        /// <param name="filter">Filter</param>
        /// <returns>User</returns>
        User FirstOrDefault(Expression<Func<User, bool>> filter);
    }
}
