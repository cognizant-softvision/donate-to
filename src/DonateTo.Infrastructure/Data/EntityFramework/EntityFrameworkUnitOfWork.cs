using DonateTo.ApplicationCore.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace DonateTo.Infrastructure.Data.EntityFramework
{
    /// <summary>
    ///     Implementation of Unit of Work using Entity Framework Core
    /// </summary>
    /// <typeparam name="TContext"></typeparam>
    public class EntityFrameworkUnitOfWork<TContext> : IUnitOfWork where TContext : DbContext
    {
        private readonly TContext _dbContext;

        public EntityFrameworkUnitOfWork(TContext dbContext)
        {
            _dbContext = dbContext;
        }

        public int Save()
        {
            return _dbContext.SaveChanges();
        }

        public async Task<int> SaveAsync()
        {
            return await _dbContext.SaveChangesAsync().ConfigureAwait(false);
        }
    }
}
