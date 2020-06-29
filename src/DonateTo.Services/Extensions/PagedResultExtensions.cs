using AutoMapper;
using DonateTo.ApplicationCore.Models.Pagination;
using System.Collections.Generic;
using System.Linq;

namespace DonateTo.Services.Extensions
{
    public static class PagedResultExtensions
    {
        /// <summary>
        /// Maps a paged Result
        /// </summary>
        /// <typeparam name="T1">Source type</typeparam>
        /// <typeparam name="T2">Destination type</typeparam>
        /// <param name="pagedResult">PagedResult</param>
        /// <param name="mapper">Automapper</param>
        /// <returns></returns>
        public static PagedResult<T2> Map<T1, T2>(this PagedResult<T1> pagedResult, IMapper mapper) where T2 : class where T1 : class
        {
            return new PagedResult<T2>()
            {
                CurrentPage = pagedResult.CurrentPage,
                PageCount = pagedResult.PageCount,
                PageSize = pagedResult.PageSize,
                RowCount = pagedResult.RowCount,
                Results = pagedResult.Results.Any() ? pagedResult.Results.Select(r => mapper.Map<T1, T2>(r)) : new List<T2>()
            };
        }
    }
}
