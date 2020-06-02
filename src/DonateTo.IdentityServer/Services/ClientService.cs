
using DonateTo.IdentityServer.Data.Repositories.Interfaces;
using IdentityServer4.EntityFramework.Entities;
using IdentityServer4.Stores;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Linq;

namespace DonateTo.IdentityServer.Services
{
    public class ClientService: IClientService
    {        private readonly IClientRepository _clientsRepository;

        public ClientService (IClientRepository clientsRepository)
        {
            _clientsRepository = clientsRepository;
        }

        public async Task<Client> CreateAsync(Client entity)
        {
            var result = await _clientsRepository.CreateAsync(entity).ConfigureAwait(false);
            await _clientsRepository.SaveChanges();
            return result;
        }

        public async Task DeleteAsync(int id)
        {
             await _clientsRepository.DeleteAsync(id).ConfigureAwait(false);
            await _clientsRepository.SaveChanges();
        }


        public async Task<IEnumerable<Client>> GetAsync(Expression<Func<Client, bool>> filter)
        {
             return await _clientsRepository.GetAsync(filter).ConfigureAwait(false);
        }

        public async Task<Client> GetAsync(int id)
        {
           return await _clientsRepository.GetAsync(id).ConfigureAwait(false);
        }

        public async Task<Client> UpdateAsync(Client entity, int id)
        {
            var result = await _clientsRepository.UpdateAsync(entity, id).ConfigureAwait(false);
            await _clientsRepository.SaveChanges();
            return result;
        }
        public async Task<IQueryable<ClientGrantType>> GetGrantTypesAsync()
        {
             return await _clientsRepository.GetGrantTypesAsync().ConfigureAwait(false);
        }

        public async Task<IQueryable<ClientScope>> GetScopesAsync()
        {
             return await _clientsRepository.GetScopesAsync().ConfigureAwait(false);
        }

        public async Task<IQueryable<ClientClaim>> GetClaimsAsync()
        {
             return await _clientsRepository.GetClaimsAsync().ConfigureAwait(false);
        }
    }
}
