using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Entities;

namespace DonateTo.ApplicationCore.Interfaces
{
    public interface IRepository<TEntity> where TEntity : Entity
    {
        IEnumerable<TEntity> Get();
        
        Task<IEnumerable<TEntity>> GetAsync();

        TEntity Get<TKey>(TKey id);

        Task<TEntity> GetAsync<TKey>(TKey id);

        TEntity Add(TEntity entity);

        Task<TEntity> AddAsync(TEntity entity);

        TEntity Update(TEntity entity);

        Task<TEntity> UpdateAsync(TEntity entity);

        void Delete(TEntity entity);

        Task DeleteAsync(TEntity entity);
    }
}
