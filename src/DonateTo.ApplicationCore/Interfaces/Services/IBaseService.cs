using DonateTo.ApplicationCore.Models.Filtering;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IBaseService<T, TFilter> : IGetService<T, TFilter> 
        where T : class
        where TFilter : BaseFilterModel
    {
        /// <summary>
        /// Create an entity.
        /// </summary>
        /// <param name="T">Entity.</param>
        /// <returns>Entity.</returns>
        T Create(T entity, string username);

        /// <summary>
        /// Create a entity async.
        /// </summary>
        /// <param name="T">Entity.</param>
        /// <returns>Entity.</returns>
        Task<T> CreateAsync(T entity, string username);

        /// <summary>
        /// Update an entity.
        /// </summary>
        /// <param name="T">Entity.</param>
        T Update(T entity, long id, string username);

        /// <summary>
        /// Update an entity async.
        /// </summary>
        /// <param name="T">entity.</param>
        /// <returns>Task.</returns>
        Task<T> UpdateAsync(T entity, long id, string username);

        /// <summary>
        /// Delete an entity.
        /// </summary>
        /// <param name="id">Id of Entity to delete.</param>
        void Delete(long id);

        /// <summary>
        /// Delete an entity async.
        /// </summary>
        /// <param name="id">Id of Entity to delete.</param>
        /// <returns>Task.</returns>
        Task DeleteAsync(long id);
    }
}
