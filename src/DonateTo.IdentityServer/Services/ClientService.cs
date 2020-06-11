
using DonateTo.IdentityServer.Data.Repositories.Interfaces;
using IdentityServer4.EntityFramework.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DonateTo.IdentityServer.Services
{
    public class ClientService: IClientService
    {        
        private readonly IClientRepository _clientsRepository;

        public ClientService (IClientRepository clientsRepository)
        {
            _clientsRepository = clientsRepository;
        }

        ///<inheritdoc cref="IClientService"/>
        public async Task<Client> CreateAsync(Client client)
        {
            var result = await _clientsRepository.CreateAsync(client).ConfigureAwait(false);
            await _clientsRepository.SaveChanges();
            return result;
        }

        ///<inheritdoc cref="IClientService"/>
        public async Task DeleteAsync(int id)
        {
             await _clientsRepository.DeleteAsync(id).ConfigureAwait(false);
            await _clientsRepository.SaveChanges();
        }

        ///<inheritdoc cref="IClientService"/>
        public async Task<IEnumerable<Client>> GetAsync(Expression<Func<Client, bool>> filter)
        {
             return await _clientsRepository.GetAsync(filter).ConfigureAwait(false);
        }

        ///<inheritdoc cref="IClientService"/>
        public async Task<Client> GetAsync(int id)
        {
           return await _clientsRepository.GetAsync(id).ConfigureAwait(false);
        }

        ///<inheritdoc cref="IClientService"/>
        public async Task<Client> UpdateAsync(Client client, int id)
        {
            var result = await _clientsRepository.UpdateAsync(client, id).ConfigureAwait(false);
            await _clientsRepository.SaveChanges();
            return result;
        }

    }
}
