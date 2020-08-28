using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;
using DonateTo.Infrastructure.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System;
using System.Linq.Dynamic.Core;
using DonateTo.Infrastructure.Extensions;
using DonateTo.ApplicationCore.Interfaces.Repositories;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class AddressRepository : EntityFrameworkRepository<Address, DonateToDbContext>, IAddressRepository
    {
        public AddressRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }

        public async Task SoftDeleteAddress(Address address)
        {
            var addressToSoftDelete = Get(null)
                .Where(a => a.Id == address.Id)
                .FirstOrDefault();

            DbContext.Addresses.Remove(addressToSoftDelete);
            await DbContext.SaveChangesAsync().ConfigureAwait(false);        
        }
    }
}
