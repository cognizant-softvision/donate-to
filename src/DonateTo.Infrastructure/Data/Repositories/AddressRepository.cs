using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class AddressRepository : EntityFrameworkRepository<Address, DonateToDbContext>
    {
        public AddressRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }
    }
}
