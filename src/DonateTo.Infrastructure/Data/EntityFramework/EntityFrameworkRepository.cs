using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Models.Pagination;
using DonateTo.Infrastructure.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DonateTo.Infrastructure.Data.EntityFramework
{
    /// <summary>
    ///     Implementation of the Repository Pattern using Entity Framework Core
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

        public TEntity FirstOrDefault(Expression<Func<TEntity, bool>> filter)
        {
            return DbContext.Set<TEntity>().FirstOrDefault(filter);
        }

        public IEnumerable<TEntity> Get(Expression<Func<TEntity, bool>> filter)
        {
            return DbContext.Set<TEntity>().Where(filter).ToList();
        }

        public async Task<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> filter)
        {
            return await Task.FromResult(DbContext.Set<TEntity>().Where(filter).ToList()).ConfigureAwait(false);
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
