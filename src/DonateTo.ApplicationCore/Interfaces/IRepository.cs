using System;
using System.Collections.Generic;
using DonateTo.ApplicationCore.Entities;

namespace DonateTo.ApplicationCore.Interfaces
{
    public interface IRepository<TEntity, TKey> where TEntity : Entity<TKey> where TKey : IComparable, IFormattable
    {
        IEnumerable<TEntity> Get();

        TEntity Get<TKey>(TKey id) where TKey : IComparable, IFormattable;

        TEntity Add(TEntity entity);

        TEntity Update(TEntity entity);

        void Delete(TEntity entity);
    }
}
