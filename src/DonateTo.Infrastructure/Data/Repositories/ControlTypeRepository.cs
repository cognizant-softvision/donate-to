using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class ControlTypeRepository : EntityFrameworkRepository<ControlType, DonateToDbContext>
    {
        public ControlTypeRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }
    }
}
