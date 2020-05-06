using DonateTo.ApplicationCore.Models.Pagination;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DonateTo.Infrastructure.Data.Extensions
{
    public static class PaginationExtensions
    {
        /// <summary>
        ///     Gets paged of query based on the number of page and page size.
        /// </summary>
        /// <typeparam name="T"> Type of class. </typeparam>
        /// <param name="query">An System.Linq.IQueryable`1 to get paged from.</param>
        /// <param name="page"> Number of the page to be obtained. </param> 
        /// <param name="pageSize"> Max number of rows in a specific page. </param>
        /// <returns> The task result contains a PagedResult of type T that contains paged 
        /// properties and elements from the input.</returns>
        public static PagedResult<T> GetPaged<T>(this IQueryable<T> query,
                                         int page, int pageSize) where T : class
        {
            var result = new PagedResult<T>
            {
                CurrentPage = page,
                PageSize = pageSize,
                RowCount = query.Count()
            };

            var pageCount = (double)result.RowCount / pageSize;
            result.PageCount = (int)Math.Ceiling(pageCount);

            var skip = (page - 1) * pageSize;
            result.Results = query.Skip(skip).Take(pageSize).ToList();

            return result;
        }

        /// <summary>
        ///     Asynchronously gets paged of query based on the number of page and page size.
        /// </summary>
        /// <typeparam name="T">Type of class.</typeparam>
        /// <param name="query">An System.Linq.IQueryable`1 to get paged from.</param>
        /// <param name="page">Number of the page to be obtained.</param>
        /// <param name="pageSize">Max number of rows in a specific page.</param>
        /// <returns>A task that represents the asynchronous operation. 
        /// The task result contains a PagedResult of type T that contains paged 
        /// properties and elements from the input.</returns>
        public static async Task<PagedResult<T>> GetPagedAsync<T>(this IQueryable<T> query,
                                 int page, int pageSize) where T : class
        {
            var result = new PagedResult<T>
            {
                CurrentPage = page,
                PageSize = pageSize,
                RowCount = await query.CountAsync().ConfigureAwait(false)
            };

            var pageCount = (double)result.RowCount / pageSize;
            result.PageCount = (int)Math.Ceiling(pageCount);

            var skip = (page - 1) * pageSize;
            result.Results = await query.Skip(skip).Take(pageSize).ToListAsync().ConfigureAwait(false);

            return result;
        }
    }
}
