using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces
{
    /// <summary>
    ///     Unit Of Work.
    /// </summary>
    public interface IUnitOfWork
    {
        /// <summary>
        ///     Applies all database changes.
        /// </summary>
        /// <returns>Number of affected rows.</returns>
        Task<int> SaveAsync();

        /// <summary>
        ///     Applies all database changes.
        /// </summary>
        /// <returns>Number of affected rows.</returns>
        int Save();
    }
}
