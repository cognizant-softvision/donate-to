using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class CityRepository : EntityFrameworkRepository<City, DonateToDbContext>
    {
        public CityRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }
    }
}
