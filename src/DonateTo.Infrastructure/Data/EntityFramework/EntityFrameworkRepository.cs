using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Models.Pagination;
using DonateTo.Infrastructure.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DonateTo.Infrastructure.Data.EntityFramework
{
    /// <summary>
    /// Implementation of the Repository Pattern using Entity Framework Core
    /// </summary>
    /// <typeparam name="TEntity"></typeparam>
    /// <typeparam name="TContext"></typeparam>
    public abstract class EntityFrameworkRepository<TEntity, TContext> : IRepository<TEntity> where TEntity : class where TContext : DbContext
    {
        protected TContext DbContext { get; private set; }

        public EntityFrameworkRepository(TContext dbContext)
        {
            DbContext = dbContext;
        }

        public virtual TEntity FirstOrDefault(Expression<Func<TEntity, bool>> filter)
        {
            return DbContext.Set<TEntity>().FirstOrDefault(filter);
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Naming", "CA1716:Identifiers should not match keywords", Justification = "<Pending>")]
        public virtual IQueryable<TEntity> Get(Expression<Func<TEntity, bool>> filter)
        {
            return DbContext.Set<TEntity>().Where(filter);
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Naming", "CA1716:Identifiers should not match keywords", Justification = "<Pending>")]
        public virtual IQueryable<TEntity> Get()
        {
            return DbContext.Set<TEntity>().AsQueryable();
        }

        public virtual async Task<IQueryable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> filter)
        {
            return await Task.FromResult(DbContext.Set<TEntity>().Where(filter)).ConfigureAwait(false);
        }

        public virtual async Task<IQueryable<TEntity>> GetAsync()
        {
            return await Task.FromResult(DbContext.Set<TEntity>().AsQueryable()).ConfigureAwait(false);
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Naming", "CA1716:Identifiers should not match keywords", Justification = "<Pending>")]
        public virtual TEntity Get(long id)
        {
            return DbContext.Set<TEntity>().Find(id);
        }

        public virtual async Task<TEntity> GetAsync(long id)
        {
            return await DbContext.Set<TEntity>().FindAsync(id).ConfigureAwait(false);
        }

        public virtual TEntity Add(TEntity entity)
        {
            DbContext.Set<TEntity>().Add(entity);

            return entity;
        }

        public virtual async Task<TEntity> AddAsync(TEntity entity)
        {
            await DbContext.Set<TEntity>().AddAsync(entity).ConfigureAwait(false);

            return entity;
        }

        public virtual TEntity Update(TEntity entity)
        {
            DbContext.Entry(entity).State = EntityState.Modified;

            return entity;
        }

        public virtual async Task<TEntity> UpdateAsync(TEntity entity)
        {
            DbContext.Entry(entity).State = EntityState.Modified;

            return await Task.FromResult(entity).ConfigureAwait(false);
        }

        public virtual void Delete(long id)
        {
            var entity =  DbContext.Set<TEntity>().Find(id);
            DbContext.Set<TEntity>().Remove(entity);
        }

        public virtual async Task DeleteAsync(long id)
        {
            var entity =  await DbContext.Set<TEntity>().FindAsync(id);
            await Task.FromResult(DbContext.Set<TEntity>().Remove(entity)).ConfigureAwait(false);
        }

        public virtual void Delete(TEntity entity)
        {
            DbContext.Set<TEntity>().Remove(entity);
        }

        public virtual async Task DeleteAsync(TEntity entity)
        {
            await Task.FromResult(DbContext.Set<TEntity>().Remove(entity)).ConfigureAwait(false);
        }

        ///<inheritdoc cref="IRepository{TEntity}"/>
        public virtual PagedResult<TEntity> GetPaged(int page, int pageSize)
        {
            return DbContext.Set<TEntity>().GetPaged(page, pageSize);
        }

        ///<inheritdoc cref="IRepository{TEntity}"/>
        public virtual async Task<PagedResult<TEntity>> GetPagedAsync(int page, int pageSize)
        {
            return await DbContext.Set<TEntity>().GetPagedAsync(page, pageSize).ConfigureAwait(false);
        }
    }
}
