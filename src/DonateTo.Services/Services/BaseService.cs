﻿using DonateTo.ApplicationCore.Models.Pagination;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace DonateTo.Services
{
    public abstract class BaseService<TEntity>: IBaseService<TEntity> where TEntity: EntityBase
    {
        private readonly IRepository<TEntity> _entityRequestRepository;
        private const string _nullEntityException = "Entity is null.";
        private const string _matchingIdException = "Entity id and id parameter does not match.";

        public BaseService(IRepository<TEntity> entityRequestRepository)
        {
            _entityRequestRepository = entityRequestRepository;
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual async Task<TEntity> CreateAsync(TEntity entity)
        {
            return await _entityRequestRepository.AddAsync(entity).ConfigureAwait(false);
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual TEntity Create(TEntity entity)
        {
            return _entityRequestRepository.Add(entity);
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
        public virtual async Task<TEntity> UpdateAsync(TEntity entity, long id)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(typeof(TEntity).ToString(), _nullEntityException);
            }
            else if(entity.Id != id)
            {
                throw new InvalidOperationException(_matchingIdException);
            }
            return await _entityRequestRepository.UpdateAsync(entity).ConfigureAwait(false);
        }
        
        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual TEntity Update(TEntity entity, long id)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(typeof(TEntity).ToString(), _nullEntityException);
            }
            else if (entity.Id != id)
            {
                throw new InvalidOperationException(_matchingIdException);
            }

            return _entityRequestRepository.Update(entity);
        }
        
        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual async Task DeleteAsync(long id)
        {
            await _entityRequestRepository.DeleteAsync(id).ConfigureAwait(false);
        }
        
        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual void Delete(long id)
        {
            _entityRequestRepository.Delete(id);
        }
        
        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual PagedResult<TEntity> GetPaged(int page, int pageSize)
        {
            return _entityRequestRepository.GetPaged(page, pageSize);
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual async Task<PagedResult<TEntity>> GetPagedAsync(int page, int pageSize) 
        {
            return await _entityRequestRepository.GetPagedAsync(page, pageSize).ConfigureAwait(false);
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
    }
}
