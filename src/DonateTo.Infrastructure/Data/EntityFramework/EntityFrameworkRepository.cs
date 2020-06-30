using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Models;
using DonateTo.ApplicationCore.Models.Pagination;
using DonateTo.Infrastructure.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
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

        ///<inheritdoc cref="IRepository{TEntity}"/>
        public virtual TEntity FirstOrDefault(Expression<Func<TEntity, bool>> filter)
        {
            return DbContext.Set<TEntity>().FirstOrDefault(filter);
        }

        ///<inheritdoc cref="IRepository{TEntity}"/>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Naming", "CA1716:Identifiers should not match keywords", Justification = "<Pending>")]
        public virtual IQueryable<TEntity> Get(Expression<Func<TEntity, bool>> filter)
        {
            var query = DbContext.Set<TEntity>().AsQueryable();
            if(filter != null) {
                query = query.Where(filter);
            }
            return query;
        }

        ///<inheritdoc cref="IRepository{TEntity}"/>
        public virtual async Task<IQueryable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> filter)
        {
            var query = DbContext.Set<TEntity>().AsQueryable();
            if(filter != null) {
                query = query.Where(filter);
            }
            return await Task.FromResult(query).ConfigureAwait(false);
        }

        ///<inheritdoc cref="IRepository{TEntity}"/>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Naming", "CA1716:Identifiers should not match keywords", Justification = "<Pending>")]
        public virtual TEntity Get(long id)
        {
            return DbContext.Set<TEntity>().Find(id);
        }

        ///<inheritdoc cref="IRepository{TEntity}"/>
        public virtual async Task<TEntity> GetAsync(long id)
        {
            return await DbContext.Set<TEntity>().FindAsync(id).ConfigureAwait(false);
        }

        ///<inheritdoc cref="IRepository{TEntity}"/>
        public virtual TEntity Add(TEntity entity)
        {
            DbContext.Set<TEntity>().Add(entity);

            return entity;
        }

        ///<inheritdoc cref="IRepository{TEntity}"/>
        public virtual async Task<TEntity> AddAsync(TEntity entity)
        {
            await DbContext.Set<TEntity>().AddAsync(entity).ConfigureAwait(false);

            return entity;
        }

        ///<inheritdoc cref="IRepository{TEntity}"/>
        public virtual TEntity Update(TEntity entity)
        {
            DbContext.Set<TEntity>().Update(entity);

            return entity;
        }

        ///<inheritdoc cref="IRepository{TEntity}"/>
        public virtual async Task<TEntity> UpdateAsync(TEntity entity)
        {
            DbContext.Set<TEntity>().Update(entity);

            return await Task.FromResult(entity).ConfigureAwait(false);
        }

        ///<inheritdoc cref="IRepository{TEntity}"/>
        public virtual void Delete(long id)
        {
            var entity =  DbContext.Set<TEntity>().Find(id);
            DbContext.Set<TEntity>().Remove(entity);
        }

        ///<inheritdoc cref="IRepository{TEntity}"/>
        public virtual async Task DeleteAsync(long id)
        {
            var entity =  await DbContext.Set<TEntity>().FindAsync(id);
            await Task.FromResult(DbContext.Set<TEntity>().Remove(entity)).ConfigureAwait(false);
        }

        ///<inheritdoc cref="IRepository{TEntity}"/>
        public virtual ApplicationCore.Models.Pagination.PagedResult<TEntity> GetPaged(int page, int pageSize, Expression<Func<TEntity, bool>> filter)
        {
            var entities = DbContext.Set<TEntity>().AsQueryable();

            if (filter != null)
            {
                entities = entities.Where(filter);
            }

            return entities.GetPaged(page, pageSize);
        }

        ///<inheritdoc cref="IRepository{TEntity}"/>
        public virtual ApplicationCore.Models.Pagination.PagedResult<TEntity> GetPaged(int pageNumber, int pageSize, IEnumerable<FilterModel> filters, SortModel sort)
        {
            var entities = DbContext.Set<TEntity>().AsQueryable();

            if (filters != null)
            {
                Expression<Func<TEntity, bool>> predicate;
                var parserConfig = new ParsingConfig();
                var conditions = string.Empty;

                foreach (var f in filters)
                {
                    conditions += string.IsNullOrEmpty(conditions) ? " And" : "";
                    conditions += $"{f.Property}.{f.Condition}(\"{f.SearchValue}\")";
                }

                predicate = DynamicExpressionParser.ParseLambda<TEntity, bool>(parserConfig, true, conditions);

                entities = entities.Where(predicate);
            }

            return entities.OrderBy(sort.SortString).GetPaged(pageNumber, pageSize);
        }

        ///<inheritdoc cref="IRepository{TEntity}"/>
        public virtual async Task<ApplicationCore.Models.Pagination.PagedResult<TEntity>> GetPagedAsync(int page, int pageSize, Expression<Func<TEntity, bool>> filter)
        {
            var entities = DbContext.Set<TEntity>().AsQueryable();

            if (filter != null)
            {
                entities = entities.Where(filter);
            }

            return await entities.GetPagedAsync(page, pageSize).ConfigureAwait(false);
        }

        ///<inheritdoc cref="IRepository{TEntity}"/>
        public virtual async Task<ApplicationCore.Models.Pagination.PagedResult<TEntity>> GetPagedAsync(int pageNumber, int pageSize, IEnumerable<FilterModel> filters, SortModel sort)
        {
            var entities = DbContext.Set<TEntity>().AsQueryable();

            if (filters != null)
            {
                Expression<Func<TEntity, bool>> predicate;
                var parserConfig = new ParsingConfig();
                var conditions = string.Empty;

                foreach (var f in filters)
                {
                    conditions += string.IsNullOrEmpty(conditions) ? " And" : "";
                    conditions += $"{f.Property}.{f.Condition}(\"{f.SearchValue}\")";
                }

                predicate = DynamicExpressionParser.ParseLambda<TEntity, bool>(parserConfig, true, conditions);

                entities = entities.Where(predicate);
            }

            entities = entities.OrderBy(sort.SortString);

            return await entities.AsQueryable().GetPagedAsync(pageNumber, pageSize).ConfigureAwait(false);
        }

        ///<inheritdoc cref="IRepository{TEntity}"/>
        public virtual async Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> filter)
        {
            return await DbContext.Set<TEntity>().FirstOrDefaultAsync(filter).ConfigureAwait(false);
        }
    }
}
