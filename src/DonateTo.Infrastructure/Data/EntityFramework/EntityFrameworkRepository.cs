using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Models.Pagination;
using DonateTo.Infrastructure.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DonateTo.Infrastructure.Data.EntityFramework
{
    public abstract class EntityFrameworkRepository<TEntity, TContext> : IRepository<TEntity> where TEntity : Entity where TContext : DbContext
    {
        protected TContext DbContext { get; private set; }

        public EntityFrameworkRepository(TContext dbContext)
        {
            DbContext = dbContext;
        }

        public IEnumerable<TEntity> Get()
        {
            return DbContext.Set<TEntity>();
        }

        public async Task<IEnumerable<TEntity>> GetAsync()
        {
            return await Task.FromResult(DbContext.Set<TEntity>()).ConfigureAwait(false);
        }

        public TEntity Get(long id)
        {
            return DbContext.Set<TEntity>().Find(id);
        }
        public async Task<TEntity> GetAsync(long id)
        {
            return await DbContext.Set<TEntity>().FindAsync(id);
        }

        public TEntity Add(TEntity entity)
        {
            DbContext.Set<TEntity>().Add(entity);

            return entity;
        }

        public async Task<TEntity> AddAsync(TEntity entity)
        {
            await DbContext.Set<TEntity>().AddAsync(entity);

            return entity;
        }

        public TEntity Update(TEntity entity)
        {
            DbContext.Entry(entity).State = EntityState.Modified;

            return entity;
        }

        public async Task<TEntity> UpdateAsync(TEntity entity)
        {
            DbContext.Entry(entity).State = EntityState.Modified;

            return await Task.FromResult(entity).ConfigureAwait(false);
        }

        public void Delete(TEntity entity)
        {
            DbContext.Set<TEntity>().Remove(entity);
        }

        public async Task DeleteAsync(TEntity entity)
        {
            await Task.FromResult(DbContext.Set<TEntity>().Remove(entity)).ConfigureAwait(false);
        }

        ///<inheritdoc cref="IRepository{TEntity}"/>
        public PagedResult<TEntity> GetPaged(int page, int pageSize)
        {
            return DbContext.Set<TEntity>().GetPaged(page, pageSize);
        }

        ///<inheritdoc cref="IRepository{TEntity}"/>
        public async Task<PagedResult<TEntity>> GetPagedAsync(int page, int pageSize)
        {
            return await DbContext.Set<TEntity>().GetPagedAsync(page, pageSize).ConfigureAwait(false);
        }
    }
}
