using System.Collections.Generic;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Entities;

namespace DonateTo.ApplicationCore.Interfaces
{
    /// <summary>
    ///     Interface to implement the Repository Pattern.
    /// </summary>
    /// <typeparam name="TEntity">Entity.</typeparam>
    public interface IRepository<TEntity> where TEntity : Entity
    {
        /// <summary>
        ///     Get a list of entities.
        /// </summary>
        /// <returns>IEnumerable of TEntity.</returns>
        IEnumerable<TEntity> Get();
        
        /// <summary>
        ///     Get a list of entities async.
        /// </summary>
        /// <returns>Task of IEnumerable of TEntity.</returns>
        Task<IEnumerable<TEntity>> GetAsync();

        /// <summary>
        ///     Get an entity by id.
        /// </summary>
        /// <param name="id">Entity id.</param>
        /// <returns>TEntity.</returns>
        TEntity Get(long id);

        /// <summary>
        ///     Get an entity by id async.
        /// </summary>
        /// <param name="id">Entity id.</param>
        /// <returns>Task of TEntity.</returns>
        Task<TEntity> GetAsync(long id);

        /// <summary>
        ///     Add an entity.
        /// </summary>
        /// <param name="entity">Entity.</param>
        /// <returns>Task of TEntity.</returns>
        TEntity Add(TEntity entity);

        /// <summary>
        ///     Add en entity async.
        /// </summary>
        /// <param name="entity">Entity.</param>
        /// <returns>TEntity.</returns>
        Task<TEntity> AddAsync(TEntity entity);

        /// <summary>
        ///     Update an entity.
        /// </summary>
        /// <param name="entity">Entity.</param>
        /// <returns>Task of TEntity.</returns>
        TEntity Update(TEntity entity);

        /// <summary>
        ///     Update an entity async.
        /// </summary>
        /// <param name="entity">Entity.</param>
        /// <returns>TEntity.</returns>
        Task<TEntity> UpdateAsync(TEntity entity);

        /// <summary>
        ///     Delete an entity.
        /// </summary>
        /// <param name="entity">Entity.</param>
        void Delete(TEntity entity);

        /// <summary>
        ///     Delete an entity async.
        /// </summary>
        /// <param name="entity">Entity.</param>
        /// <returns>Task.</returns>
        Task DeleteAsync(TEntity entity);
    }
}
