using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class CategoryRepository : EntityFrameworkRepository<Category, DonateToDbContext>
    {
        public CategoryRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }
    }
}
