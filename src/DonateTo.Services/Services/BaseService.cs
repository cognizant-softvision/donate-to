﻿using DonateTo.ApplicationCore.Models.Pagination;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.Infrastructure.Data.Repositories;
using DonateTo.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;

namespace DonateTo.Services
{
    public abstract class BaseService<TEntity>: IBaseService<TEntity> where TEntity: EntityBase
    {
        private readonly IRepository<TEntity> _entityRequestRepository;
        public BaseService(IRepository<TEntity> entityRequestRepository)
        {
            this._entityRequestRepository = entityRequestRepository;
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual async Task<TEntity> CreateAsync(TEntity entity) {
            return await this._entityRequestRepository.AddAsync(entity);
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual TEntity Create(TEntity entity) {
            return this._entityRequestRepository.Add(entity);
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual TEntity Get(long id) {
            return this._entityRequestRepository.Get(id);
        }

         ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual async Task<TEntity> GetAsync(long id){
            return await this._entityRequestRepository.GetAsync(id);
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual async Task<TEntity> UpdateAsync(TEntity entity, long id) {
            if(entity.Id != id) {
                throw new InvalidOperationException();
            }
            return await this._entityRequestRepository.UpdateAsync(entity);
        }
        
        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual TEntity Update(TEntity entity, long id) {
            if(entity.Id != id) {
                throw new InvalidOperationException();
            }
            return this._entityRequestRepository.Update(entity);
        }
        
        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual async Task DeleteAsync(long id) {
            await this._entityRequestRepository.DeleteAsync(id);
        }
        
        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual void Delete(long id) {
            this._entityRequestRepository.Delete(id);
        }
        
        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual PagedResult<TEntity> GetPaged(int page, int pageSize) {
            return this._entityRequestRepository.GetPaged(page, pageSize);
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual async Task<PagedResult<TEntity>> GetPagedAsync(int page, int pageSize)  {
            return await this._entityRequestRepository.GetPagedAsync(page, pageSize);
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual IEnumerable<TEntity> Get() {
            return this._entityRequestRepository.Get();
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual async Task<IEnumerable<TEntity>> GetAsync()  {
            return await this._entityRequestRepository.GetAsync();
        }

    }
}
