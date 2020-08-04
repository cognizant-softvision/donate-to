using DonateTo.ApplicationCore.Models.Filtering;
using DonateTo.ApplicationCore.Models.Pagination;
using System;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IGetPagedFilteredService<T, TFilter>
        where T : class
        where TFilter : BaseFilterModel
    {
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
        /// Get async paged result filtered and sorted
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        PagedResult<T> GetPagedFiltered(TFilter filter);

        /// <summary>
        /// Get async paged result filtered and sorted
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        Task<PagedResult<T>> GetPagedFilteredAsync(TFilter filter);
    }
}

