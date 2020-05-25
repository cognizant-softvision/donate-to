using System.Linq;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.Infrastructure.Data.EntityFramework;
using Microsoft.EntityFrameworkCore;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class AddressRepository : EntityFrameworkRepository<Address, DonateToDbContext>, IAddressRepository
    {
        public AddressRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }

        public IQueryable<Address> GetByOrganizationId(long organizationId)
        {
            var organizationAddresses = DbContext.Set<Address>()
                .AsNoTracking()
                .AsQueryable()
                .Where(address => address.OrganizationId == organizationId);

            return organizationAddresses;
        }

        public async Task<IQueryable<Address>> GetByOrganizationIdAsync(long organizationId)
        {
            var organizationAddresses = DbContext.Set<Address>()
                .AsNoTracking()
                .AsQueryable()
                .Where(address => address.OrganizationId == organizationId);

            return await Task.FromResult(organizationAddresses).ConfigureAwait(false);
        }
    }
}
