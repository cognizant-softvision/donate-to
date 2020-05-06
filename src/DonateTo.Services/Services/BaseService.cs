using DonateTo.ApplicationCore.Models.Pagination;
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
            _entityRequestRepository = entityRequestRepository;
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual async Task<TEntity> CreateAsync(TEntity entity) {
            return await _entityRequestRepository.AddAsync(entity).ConfigureAwait(false);
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual TEntity Create(TEntity entity) {
            return _entityRequestRepository.Add(entity);
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual TEntity Get(long id) {
            return _entityRequestRepository.Get(id);
        }

         ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual async Task<TEntity> GetAsync(long id){
            return await _entityRequestRepository.GetAsync(id).ConfigureAwait(false);
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual async Task<TEntity> UpdateAsync(TEntity entity, long id) {
            if(entity.Id != id) {
                throw new InvalidOperationException();
            }
            return await _entityRequestRepository.UpdateAsync(entity).ConfigureAwait(false);
        }
        
        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual TEntity Update(TEntity entity, long id) {
            if(entity.Id != id) {
                throw new InvalidOperationException("The id on the entity and the one passed on do not match.");
            }
            return _entityRequestRepository.Update(entity);
        }
        
        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual async Task DeleteAsync(long id) {
            await _entityRequestRepository.DeleteAsync(id).ConfigureAwait(false);
        }
        
        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual void Delete(long id) {
            _entityRequestRepository.Delete(id);
        }
        
        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual PagedResult<TEntity> GetPaged(int page, int pageSize) {
            return _entityRequestRepository.GetPaged(page, pageSize);
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual async Task<PagedResult<TEntity>> GetPagedAsync(int page, int pageSize)  {
            return await _entityRequestRepository.GetPagedAsync(page, pageSize).ConfigureAwait(false);
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual IEnumerable<TEntity> Get() {
            return _entityRequestRepository.Get();
        }

        ///<inheritdoc cref="IBaseService{TEntity}"/>
        public virtual async Task<IEnumerable<TEntity>> GetAsync()  {
            return await _entityRequestRepository.GetAsync().ConfigureAwait(false);
        }

    }
}
