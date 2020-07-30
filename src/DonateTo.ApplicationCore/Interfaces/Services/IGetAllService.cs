using DonateTo.ApplicationCore.Models.Filtering;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IGetAllService<T, TFilter> : IGetPagedFilteredService<T, TFilter>
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

    }
}
