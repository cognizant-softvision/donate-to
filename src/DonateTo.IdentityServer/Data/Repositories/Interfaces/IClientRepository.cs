
using IdentityServer4.EntityFramework.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Linq;
using System;


namespace DonateTo.IdentityServer.Data.Repositories.Interfaces
{
    public interface IClientRepository
    {
        Task<Client> CreateAsync(Client entity);
        Task DeleteAsync(int id);
        Task<IQueryable<Client>> GetAsync(Expression<Func<Client, bool>> filter);
        Task<Client> GetAsync(int id);
        Task<Client> UpdateAsync(Client entity, int id);
        Task<IQueryable<ClientClaim>> GetClaimsAsync();
        Task<IQueryable<ClientScope>> GetScopesAsync();
        Task<IQueryable<ClientGrantType>> GetGrantTypesAsync();
        Task SaveChanges();
    }
}


