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
    public class LogRepository : EntityFrameworkRepository<Log, DonateToDbContext>
    {
        public LogRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }

        ///<inheritdoc cref="IRepository{Log}"/>
        public override ApplicationCore.Models.Pagination.PagedResult<Log>
            GetPaged(int page, int pageSize, Expression<Func<Log, bool>> filter = null, string sort = "")
        {
            var logs = DbContext.Set<Log>()
                .FilterAndSort(filter, sort);

            return logs.GetPaged(page, pageSize);
        }

        ///<inheritdoc cref="IRepository{Log}"/>
        public override async Task<ApplicationCore.Models.Pagination.PagedResult<Log>>
            GetPagedAsync(int page, int pageSize, Expression<Func<Log, bool>> filter = null, string sort = "")
        {
            var logs = DbContext.Set<Log>()
                .FilterAndSort(filter, sort);

            return await logs.GetPagedAsync(page, pageSize).ConfigureAwait(false);
        }
    }
}