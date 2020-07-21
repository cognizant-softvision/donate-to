using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;
using DonateTo.Infrastructure.Data.Extensions;
using DonateTo.Infrastructure.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class UserRepository : EntityFrameworkRepository<User, DonateToDbContext>
    {
        public UserRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }

        public override User Get(long id)
        {
            return GetHydratedUsers().FirstOrDefault(u => u.Id.Equals(id));
        }

        public async override Task<User> GetAsync(long id)
        {
            return await GetHydratedUsers().FirstOrDefaultAsync(u => u.Id.Equals(id)).ConfigureAwait(false);
        }

        public override IQueryable<User> Get(Expression<Func<User, bool>> filter)
        {
            return GetHydratedUsers().Where(filter);
        }

        public override async Task<IQueryable<User>> GetAsync(Expression<Func<User, bool>> filter)
        {
            var users = GetHydratedUsers();

            if (filter != null)
            {
                users = users.Where(filter);
            }

            return (await users.ToListAsync().ConfigureAwait(false)).AsQueryable();
        }

        ///<inheritdoc cref="IRepository{User}"/>
        public override ApplicationCore.Models.Pagination.PagedResult<User>
            GetPaged(int page, int pageSize, Expression<Func<User, bool>> filter = null, string sort = "")
        {
            var users = GetHydratedUsers()
                .FilterAndSort(filter, sort);

            return users.GetPaged(page, pageSize);
        }

        ///<inheritdoc cref="IRepository{User}"/>
        public override async Task<ApplicationCore.Models.Pagination.PagedResult<User>>
            GetPagedAsync(int page, int pageSize, Expression<Func<User, bool>> filter = null, string sort = "")
        {
            var users = GetHydratedUsers()
                .FilterAndSort(filter, sort);

            return await users.GetPagedAsync(page, pageSize).ConfigureAwait(false);
        }

        #region private
        private IQueryable<User> GetHydratedUsers()
        {
            return DbContext.Set<User>()
                .Include(u => u.UserOrganizations).ThenInclude(uo => uo.Organization)
                .Include(u => u.UserRoles).ThenInclude(ur => ur.Role);
        }
        #endregion
    }
}
