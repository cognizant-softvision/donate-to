using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class StateRepository : EntityFrameworkRepository<State, DonateToDbContext>
    {
        public StateRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }
    }
}
