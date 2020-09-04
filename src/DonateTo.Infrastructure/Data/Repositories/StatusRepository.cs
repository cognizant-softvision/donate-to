using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Repositories;
using DonateTo.Infrastructure.Data.EntityFramework;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class StatusRepository : EntityFrameworkRepository<Status, DonateToDbContext>
    {
        public StatusRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }
    }
}
