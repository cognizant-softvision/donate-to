using System.Collections.Generic;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Entities;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IUserService
    {
        /// <summary>
        ///     Create an user async.
        /// </summary>
        /// <param name="user">User entity.</param>
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
        ///     Get an user by id async.
        /// </summary>
        /// <param name="id">User id.</param>
        /// <returns>User.</returns>
        Task<User> GetAsync(int id);

        /// <summary>
        ///     Update an user async.
        /// </summary>
        /// <param name="user">User entity.</param>
        /// <returns>Task.</returns>
        Task UpdateAsync(User user);
        
        /// <summary>
        ///     Update an user.
        /// </summary>
        /// <param name="user">User.</param>
        void Update(User user);
        
        /// <summary>
        ///     Delete an user async.
        /// </summary>
        /// <param name="id">User id.</param>
        /// <returns>Task.</returns>
        Task DeleteAsync(int id);
        
        /// <summary>
        ///     Delete an user.
        /// </summary>
        /// <param name="id">User id.</param>
        void Delete(int id);
        
        /// <summary>
        ///     Get a list of users.
        /// </summary>
        /// <returns>IEnumerable of User.</returns>
        IEnumerable<User> Get();

        /// <summary>
        ///     Get a list of users async.
        /// </summary>
        /// <returns>IEnumerable of User.</returns>
        Task<IEnumerable<User>> GetAsync();
    }
}
