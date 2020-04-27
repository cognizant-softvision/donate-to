using DonateTo.Infrastructure.Data.Pagination;
using System;
using System.Linq;

namespace DonateTo.Infrastructure.Data.Extensions
{
    public static class PaginationExtensions
    {
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
            result.SetResults(query.Skip(skip).Take(pageSize).ToList());

            return result;
        }
    }
}
