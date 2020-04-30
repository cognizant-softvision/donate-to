using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces
{
    /// <summary>
    ///     Interface to implement the Repository Pattern.
    /// </summary>
    /// <typeparam name="TEntity">Entity.</typeparam>
    public interface IRepository<TEntity> where TEntity : class
    {
        /// <summary>
        /// Get a list of entities.
        /// </summary>
        /// <param name="filter">Filter</param>
        /// <returns>IEnumerable of TEntity.</returns>
        IEnumerable<TEntity> Get(Expression<Func<TEntity, bool>> filter);

        /// <summary>
        /// Get a list of entities async.
        /// </summary>
        /// <param name="filter">Filter</param>
        /// <returns>Task of IEnumerable of TEntity.</returns>
        Task<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> filter);

        /// <summary>
        /// Get a First or default entities.
        /// </summary>
        /// <param name="filter">Filter</param>
        /// <returns>IEnumerable of TEntity.</returns>
        TEntity FirstOrDefault(Expression<Func<TEntity, bool>> filter);

        /// <summary>
        /// Get an entity by id.
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
        ///     Gets a list of paged entities by page and page size. 
        /// </summary>
        /// <param name="page">Number of the page to be obtained.</param>
        /// <param name="pageSize">Max number of rows in a specific page.</param>
        /// <returns>PagedResult of TEntity.</returns>
        PagedResult<TEntity> GetPaged(int page, int pageSize);

        /// <summary>
        ///     Gets a list of paged entities by page and page size async.
        /// </summary>
        /// <param name="page">Number of the page to be obtained.</param>
        /// <param name="pageSize">Max number of rows in a specific page.</param>
        /// <returns>Task of PagedResult of TEntity.</returns>
        Task<PagedResult<TEntity>> GetPagedAsync(int page, int pageSize);

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
