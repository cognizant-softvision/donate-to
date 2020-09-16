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
using DonateTo.ApplicationCore.Common;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class AddressRepository : EntityFrameworkRepository<Address, DonateToDbContext>, IAddressRepository
    {
        public AddressRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }

        public async Task SoftDeleteAddress(long addressId)
        {
            var addressToSoftDelete = Get(null)
                .Where(a => a.Id == addressId)
                .FirstOrDefault();

            var donationsActive = DbContext.DonationRequests
                    .Where(d => (d.AddressId == addressId) &&
                                (d.StatusId == StatusType.Pending))
                    .ToList();

            if (donationsActive.Count() > 0)
            {
                throw new Exception("Admin.Organization.DeleteError");
            }
            else
            {
                DbContext.Addresses.Remove(addressToSoftDelete);
                await DbContext.SaveChangesAsync().ConfigureAwait(false);
            }
        }
    }
}
