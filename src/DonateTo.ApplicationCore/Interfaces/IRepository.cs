using System.Collections.Generic;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Models.Pagination;

namespace DonateTo.ApplicationCore.Interfaces
{
    public interface IRepository<TEntity> where TEntity : Entity
    {
        IEnumerable<TEntity> Get();
        
        Task<IEnumerable<TEntity>> GetAsync();

        TEntity Get(long id);

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

        TEntity Add(TEntity entity);

        Task<TEntity> AddAsync(TEntity entity);

        TEntity Update(TEntity entity);

        Task<TEntity> UpdateAsync(TEntity entity);

        void Delete(TEntity entity);

        Task DeleteAsync(TEntity entity);
    }
}
