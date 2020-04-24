using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class UnitRepository : EntityFrameworkRepository<Unit, DonateToDbContext>
    {
        public UnitRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }
    }
}
