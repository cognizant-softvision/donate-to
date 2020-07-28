using DonateTo.ApplicationCore.Models.Pagination;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using DonateTo.ApplicationCore.Models.Filtering;
using LinqKit;
using Microsoft.EntityFrameworkCore.Internal;
using System.Linq;
using DonateTo.ApplicationCore.Common;
using System.Globalization;

namespace DonateTo.Services
{
    public abstract class BaseService<TEntity, TFilter>: IBaseService<TEntity, TFilter> 
        where TEntity: EntityBase
        where TFilter: BaseFilterModel
    {
        private readonly IRepository<TEntity> _entityRequestRepository;
        private readonly IUnitOfWork _unitOfWork;

        private const string _nullEntityException = "Entity is null.";
        private const string _matchingIdException = "Entity id and id parameter does not match.";
        private const string _keyNotFoundException = "Given key does not match any Entity.";

        protected BaseService(IRepository<TEntity> entityRequestRepository, IUnitOfWork unitOfWork)
        {
            _entityRequestRepository = entityRequestRepository;
            _unitOfWork = unitOfWork;
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual async Task<TEntity> CreateAsync(TEntity entity, string username = null)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(typeof(TEntity).ToString(), _nullEntityException);
            }
            
            entity.CreatedBy = username;
            entity.CreatedDate = DateTime.UtcNow;
            entity.UpdateBy = username;
            entity.UpdateDate= DateTime.UtcNow;

            entity = await _entityRequestRepository.AddAsync(entity).ConfigureAwait(false);
            await _unitOfWork.SaveAsync().ConfigureAwait(false);

            return entity;
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual TEntity Create(TEntity entity, string username = null)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(typeof(TEntity).ToString(), _nullEntityException);
            }

            entity.CreatedBy = username;
            entity.CreatedDate = DateTime.UtcNow;
            entity.UpdateBy = username;
            entity.UpdateDate = DateTime.UtcNow;

            entity = _entityRequestRepository.Add(entity);
            _unitOfWork.Save();

            return entity;
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Naming", "CA1716:Identifiers should not match keywords", Justification = "<Pending>")]
        public virtual TEntity Get(long id)
        {
            return _entityRequestRepository.Get(id);
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual async Task<TEntity> GetAsync(long id)
        {
            return await _entityRequestRepository.GetAsync(id).ConfigureAwait(false);
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual async Task<TEntity> UpdateAsync(TEntity entity, long id, string username = null)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(typeof(TEntity).ToString(), _nullEntityException);
            }
            else if(entity.Id != id)
            {
                throw new InvalidOperationException(_matchingIdException);
            }

            entity.UpdateBy = username;
            entity.UpdateDate = DateTime.UtcNow;

            entity =  await _entityRequestRepository.UpdateAsync(entity).ConfigureAwait(false);
            await _unitOfWork.SaveAsync().ConfigureAwait(false);

            return entity;
        }
        
        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual TEntity Update(TEntity entity, long id, string username = null)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(typeof(TEntity).ToString(), _nullEntityException);
            }
            else if (entity.Id != id)
            {
                throw new InvalidOperationException(_matchingIdException);
            }

            entity.UpdateBy = username;
            entity.UpdateDate = DateTime.UtcNow;

            entity = _entityRequestRepository.Update(entity);
            _unitOfWork.Save();

            return entity;
        }
        
        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual async Task DeleteAsync(long id)
        {
            if (await _entityRequestRepository.GetAsync(id).ConfigureAwait(false) != null)
            {
                await _entityRequestRepository.DeleteAsync(id).ConfigureAwait(false);
                await _unitOfWork.SaveAsync().ConfigureAwait(false);
            }
            else
            {
                throw new KeyNotFoundException(_keyNotFoundException);
            }
        }
        
        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual void Delete(long id)
        {
            if (_entityRequestRepository.Get(id) != null)
            {
                _entityRequestRepository.Delete(id);
                _unitOfWork.Save();
            }
            else
            {
                throw new KeyNotFoundException(_keyNotFoundException);
            }            
        }
        
        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual PagedResult<TEntity> GetPaged(int page, int pageSize, Expression<Func<TEntity, bool>> filter = null)
        {
            return _entityRequestRepository.GetPaged(page, pageSize, filter);
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual async Task<PagedResult<TEntity>> GetPagedAsync(int page, int pageSize, Expression<Func<TEntity, bool>> filter = null) 
        {
            return await _entityRequestRepository.GetPagedAsync(page, pageSize, filter).ConfigureAwait(false);
        }


        ///<inheritdoc cref="IBaseService{TEntity}"/>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Naming", "CA1716:Identifiers should not match keywords", Justification = "<Pending>")]
        public virtual IEnumerable<TEntity> Get(Expression<Func<TEntity,bool>> filter)
        {
            return _entityRequestRepository.Get(filter);
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual async Task<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> filter)
        {
            return await _entityRequestRepository.GetAsync(filter).ConfigureAwait(false);
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public TEntity FirstOrDefault(Expression<Func<TEntity, bool>> filter = null)
        {
            return _entityRequestRepository.FirstOrDefault(filter);
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual async Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> filter)
        {
            return await _entityRequestRepository.FirstOrDefaultAsync(filter).ConfigureAwait(false);
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual PagedResult<TEntity> GetPagedFiltered(TFilter filter)
        {
            var predicate = GetPredicate(filter);

            return _entityRequestRepository.GetPaged(filter.PageNumber, filter.PageSize, predicate, GetSort(filter));
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual async Task<PagedResult<TEntity>> GetPagedFilteredAsync(TFilter filter)
        {
            var predicate = GetPredicate(filter);

            return await _entityRequestRepository.GetPagedAsync(filter.PageNumber, filter.PageSize, predicate, GetSort(filter)).ConfigureAwait(false);
        }

        /// <summary>
        /// Get TEntity base predicate from given filter
        /// </summary>
        /// <param name="filter">Filter</param>
        /// <returns>Predicate</returns>
        protected virtual Expression<Func<TEntity, bool>> GetPredicate(TFilter filter)
        {
            var predicate = PredicateBuilder.New<TEntity>(true);

            if (filter.UpdateDateBegin != null && filter.UpdateDateBegin != DateTime.MinValue)
            {
                predicate = predicate.Or(p => p.UpdateDate >= filter.UpdateDateBegin);
            }

            if (filter.UpdateDateEnd != null && filter.UpdateDateEnd != DateTime.MinValue)
            {
                predicate = predicate.Or(p => p.UpdateDate <= filter.UpdateDateEnd);
            }

            return predicate;
        }


        /// <summary>
        /// Returns sort string from filter model
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Globalization", "CA1308:Normalize strings to uppercase", Justification = "<Pending>")]
        protected string GetSort(TFilter filter) 
        {
            var properties = typeof(TEntity).GetProperties();

            var sort = !string.IsNullOrEmpty(filter.OrderBy) 
                && properties.Any(p => p.Name.ToUpperInvariant() == filter.OrderBy.ToUpperInvariant()) ?
                $"{ char.ToUpperInvariant(filter.OrderBy[0]) + filter.OrderBy.Substring(1).ToLowerInvariant() } " :
                "Id ";

            sort += !string.IsNullOrEmpty(filter.OrderDirection)
                && new[] { SortDirection.Desc, SortDirection.Descend, SortDirection.Descending }.Any(order => filter.OrderDirection == order) ?
                    SortDirection.Desc :
                    SortDirection.Asc;

            return sort;
        }
    }
}
