
using IdentityServer4.EntityFramework.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Linq;

namespace  DonateTo.IdentityServer.Services
{
    public interface IClientService
    { 
        
        Task<Client> CreateAsync(Client entity);
        Task DeleteAsync(int id);
        Task<IEnumerable<Client>> GetAsync(Expression<Func<Client, bool>> filter);
        Task<Client> GetAsync(int id);
        Task<Client> UpdateAsync(Client entity, int id);
        Task<IQueryable<ClientClaim>> GetClaimsAsync();
        Task<IQueryable<ClientScope>> GetScopesAsync();
        Task<IQueryable<ClientGrantType>> GetGrantTypesAsync();

       
    }
}
