using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class CountryRepository : EntityFrameworkRepository<Country, DonateToDbContext>
    {
        public CountryRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }
    }
}
