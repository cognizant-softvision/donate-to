using DonateTo.ApplicationCore.Models.Filtering;
using DonateTo.ApplicationCore.Models.Pagination;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IGetService<T, TFilter> 
        where T : class 
        where TFilter : BaseFilterModel
    {
        /// <summary>
        /// Get a list of entity.
        /// </summary>
        /// <param name="filter">Filter</param>
        /// <returns>IEnumerable of entity.</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Naming", "CA1716:Identifiers should not match keywords", Justification = "<Pending>")]
        IEnumerable<T> Get(Expression<Func<T, bool>> filter = null);

        /// <summary>
        /// Get a list of entity async.
        /// </summary>
        /// <param name="filter">Filter</param>
        /// <returns>IEnumerable of entity.</returns>
        Task<IEnumerable<T>> GetAsync(Expression<Func<T, bool>> filter = null);

        /// <summary>
        /// Get a paged list of entity.
        /// </summary>
        /// <returns>IEnumerable of entity.</returns>
        PagedResult<T> GetPaged(int page, int pageSize, Expression<Func<T, bool>> filter = null);

        /// <summary>
        /// Get a paged list of entity async.
        /// </summary>
        /// <returns>IEnumerable of entity.</returns>
        Task<PagedResult<T>> GetPagedAsync(int page, int pageSize, Expression<Func<T, bool>> filter = null);

        /// <summary>
        /// Get an entity by id.
        /// </summary>
        /// <param name="id">Entity id.</param>
        /// <returns>TEntity.</returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Naming", "CA1716:Identifiers should not match keywords", Justification = "<Pending>")]
        T Get(long id);

        /// <summary>
        /// Get an entity by id async.
        /// </summary>
        /// <param name="id">User id.</param>
        /// <returns>User.</returns>
        Task<T> GetAsync(long id);

        /// <summary>
        /// Get First or Default
        /// </summary>
        /// <param name="filter">Filter</param>
        /// <returns>User</returns>
        T FirstOrDefault(Expression<Func<T, bool>> filter = null);

        /// <summary>
        /// Get First or Default Async
        /// </summary>
        /// <param name="filter">Filter</param>
        /// <returns>User</returns>
        Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> filter = null);

        /// <summary>
        /// Get async paged result filtered and sorted
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        Task<PagedResult<T>> GetPagedFilteredAsync(TFilter filter);
    }
}
