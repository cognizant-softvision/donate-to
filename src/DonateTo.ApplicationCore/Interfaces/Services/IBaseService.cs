using System.Collections.Generic;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IBaseService<T> where T : class
    {
        /// <summary>
        ///     Get a list of entity.
        /// </summary>
        /// <returns>IEnumerable of entity.</returns>
        IEnumerable<T> Get();

        /// <summary>
        ///     Get a list of entity async.
        /// </summary>
        /// <returns>IEnumerable of entity.</returns>
        Task<IEnumerable<T>> GetAsync();

        /// <summary>
        ///     Get an entity by id.
        /// </summary>
        /// <param name="id">Entity id.</param>
        /// <returns>TEntity.</returns>
        IEnumerable<T> Get(long id);

        /// <summary>
        ///     Get an entity by id async.
        /// </summary>
        /// <param name="id">User id.</param>
        /// <returns>User.</returns>
        Task<T> GetAsync(long id);

        /// <summary>
        ///     Create an entity.
        /// </summary>
        /// <param name="T">Entity.</param>
        /// <returns>Entity.</returns>
        T Create(T entity);

        /// <summary>
        ///     Create a entity async.
        /// </summary>
        /// <param name="T">Entity.</param>
        /// <returns>Entity.</returns>
        Task<T> CreateAsync(T entity);

        /// <summary>
        ///     Update an entity.
        /// </summary>
        /// <param name="T">Entity.</param>
        void Update(T entity, long id);

        /// <summary>
        ///     Update an entity async.
        /// </summary>
        /// <param name="T">entity.</param>
        /// <returns>Task.</returns>
        Task UpdateAsync(T entity, long id);

        /// <summary>
        ///     Delete an entity.
        /// </summary>
        /// <param name="id">Entity id.</param>
        void Delete(long id);

        /// <summary>
        ///     Delete an entity async.
        /// </summary>
        /// <param name="id">Entity id.</param>
        /// <returns>Task.</returns>
        Task DeleteAsync(long id);
    }
}
