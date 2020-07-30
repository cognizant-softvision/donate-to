using DonateTo.ApplicationCore.Models.Filtering;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IGetService<T, TFilter> : IGetAllService<T, TFilter>, IGetPagedFilteredService<T, TFilter>
        where T : class 
        where TFilter : BaseFilterModel
    {
               
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

    }
}
