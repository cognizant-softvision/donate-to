using IdentityServer4.EntityFramework.Entities;
using DonateTo.IdentityServer.Data.EntityFramework;
using DonateTo.IdentityServer.Data.Repositories.Interfaces;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System;
using System.Linq;

using Microsoft.EntityFrameworkCore;

namespace DonateTo.IdentityServer.Data.Repositories
{
    public class ClientRepository : IClientRepository
    {
        private readonly CustomConfigurationDbContext _dbContext;
        public ClientRepository(CustomConfigurationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Client> CreateAsync(Client client)
        {
            var newEntity = await _dbContext.AddAsync(client).ConfigureAwait(false);
            return newEntity.Entity;
        }

        public async Task DeleteAsync(int id)
        {
            await Task.FromResult(_dbContext.Clients.Remove(new Client { Id = id })).ConfigureAwait(false);
        }

        public async Task<IQueryable<Client>> GetAsync(Expression<Func<Client, bool>> filter)
        {
            return await Task.FromResult(_dbContext.Clients.Where(filter)).ConfigureAwait(false);
        }

        public async Task<Client> GetAsync(int id)
        {
            return await _dbContext.Clients.Include(c => c.AllowedCorsOrigins).
                Include(c => c.AllowedGrantTypes).Include(c => c.AllowedScopes).Include(c => c.Claims).
                Include(c => c.ClientSecrets).Include(c => c.RedirectUris).Include(c => c.PostLogoutRedirectUris).
                Include(c => c.IdentityProviderRestrictions).Include(c => c.Properties).Include(c => c.Properties).
                FirstOrDefaultAsync(c => c.Id == id).ConfigureAwait(false);
        }

        public async Task<Client> UpdateAsync(Client client, int id)
        {

            if (id != client.Id)
            {
                throw new NotSupportedException("Provided Id and client's Id do not match.");
            }
            _dbContext.Update(client);

            var oldClient = await GetUnmodifiedAsync(client.Id);

            RefreshRelatedEntity<int, ClientGrantType>(oldClient.AllowedGrantTypes.Select( gt => gt.Id).ToArray(), client.AllowedGrantTypes.Select(gt => gt.Id).ToArray());
            RefreshRelatedEntity<int, ClientScope>(oldClient.AllowedScopes.Select(gt => gt.Id).ToArray(), client.AllowedScopes.Select(gt => gt.Id).ToArray());
            RefreshRelatedEntity<int, ClientClaim>(oldClient.Claims.Select(gt => gt.Id).ToArray(), client.Claims.Select(gt => gt.Id).ToArray());
            RefreshRelatedEntity<int, ClientRedirectUri>(oldClient.RedirectUris.Select(gt => gt.Id).ToArray(), client.RedirectUris.Select(gt => gt.Id).ToArray());
            RefreshRelatedEntity<int, ClientPostLogoutRedirectUri>(oldClient.PostLogoutRedirectUris.Select(gt => gt.Id).ToArray(), client.PostLogoutRedirectUris.Select(gt => gt.Id).ToArray());
            RefreshRelatedEntity<int, ClientCorsOrigin>(oldClient.AllowedCorsOrigins.Select(gt => gt.Id).ToArray(), client.AllowedCorsOrigins.Select(gt => gt.Id).ToArray());
            RefreshRelatedEntity<int, ClientSecret>(oldClient.ClientSecrets.Select(gt => gt.Id).ToArray(), client.ClientSecrets.Select(gt => gt.Id).ToArray());


            return await Task.FromResult(client).ConfigureAwait(false);
        }

        private async Task<Client> GetUnmodifiedAsync(int id)
        {
            return await _dbContext.Clients.AsNoTracking().Include(c => c.AllowedCorsOrigins).
                Include(c => c.AllowedGrantTypes).Include(c => c.AllowedScopes).Include(c => c.Claims).
                Include(c => c.ClientSecrets).Include(c => c.RedirectUris).Include(c => c.PostLogoutRedirectUris).
                Include(c => c.IdentityProviderRestrictions).Include(c => c.Properties).Include(c => c.Properties).
                FirstOrDefaultAsync(c => c.Id == id).ConfigureAwait(false);
        }

        private void RefreshRelatedEntity<TId, TEntity>(TId[] originalListIds, TId[] newListIds) where TEntity : class
        {
            var removedList = originalListIds.Except(newListIds);
            foreach (var removed in removedList)
            {
                var toRemove = _dbContext.Find<TEntity>(removed);
                _dbContext.Remove(toRemove);
            }
        }

        public async Task<IQueryable<ClientClaim>> GetClaimsAsync()
        {
            return await Task.FromResult(_dbContext.Set<ClientClaim>()).ConfigureAwait(false);
        }

        public async Task<IQueryable<ClientScope>> GetScopesAsync()
        {
            return await Task.FromResult(_dbContext.Set<ClientScope>()).ConfigureAwait(false);
        }

        public async Task<IQueryable<ClientGrantType>> GetGrantTypesAsync()
        {
            return await Task.FromResult(_dbContext.Set<ClientGrantType>()).ConfigureAwait(false);
        }

        public async Task SaveChanges()
        {
            await _dbContext.SaveChangesAsync().ConfigureAwait(false);
        }

    }
}
