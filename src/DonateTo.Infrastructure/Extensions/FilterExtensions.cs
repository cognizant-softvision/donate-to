using System;
using System.Linq;
using System.Linq.Expressions;
using System.Linq.Dynamic.Core;

namespace DonateTo.Infrastructure.Extensions
{
    public static class FilterExtensions
    {
        /// <summary>
        /// Filter and sort entities
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entities"></param>
        /// <param name="filter"></param>
        /// <param name="sort"></param>
        /// <returns></returns>
        public static IQueryable<T> FilterAndSort<T>(this IQueryable<T> entities, Expression<Func<T, bool>> filter, string sort)
        {
            if (filter != null)
            {
                entities = entities.Where(filter);
            }

            if (!string.IsNullOrEmpty(sort))
            {
                entities = entities.OrderBy(sort);
            }

            return entities;
        }
    }
}
