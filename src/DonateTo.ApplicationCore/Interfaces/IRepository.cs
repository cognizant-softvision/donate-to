﻿using System.Collections.Generic;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Models.Pagination;

namespace DonateTo.ApplicationCore.Interfaces
{
    public interface IRepository<TEntity> where TEntity : Entity
    {
        IEnumerable<TEntity> Get();
        
        Task<IEnumerable<TEntity>> GetAsync();

        TEntity Get(long id);

        Task<TEntity> GetAsync(long id);

        PagedResult<TEntity> GetPaged(int page, int pageSize);

        Task <PagedResult<TEntity>> GetPagedAsync(int page, int pageSize);

        TEntity Add(TEntity entity);

        Task<TEntity> AddAsync(TEntity entity);

        TEntity Update(TEntity entity);

        Task<TEntity> UpdateAsync(TEntity entity);

        void Delete(TEntity entity);

        Task DeleteAsync(TEntity entity);
    }
}
