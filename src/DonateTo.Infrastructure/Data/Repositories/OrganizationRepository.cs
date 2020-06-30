using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Models;
using DonateTo.Infrastructure.Data.EntityFramework;
using DonateTo.Infrastructure.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class OrganizationRepository : EntityFrameworkRepository<Organization, DonateToDbContext>
    {
        public OrganizationRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }

        ///<inheritdoc cref="IRepository{Organization}"/>
        public override ApplicationCore.Models.Pagination.PagedResult<Organization> GetPaged(int pageNumber, int pageSize, IEnumerable<FilterModel> filters, SortModel sort)
        {
            var organizations = GetHydratedOrganization();

            if (filters != null)
            {
                Expression<Func<Organization, bool>> predicate;
                var parserConfig = new ParsingConfig();
                var conditions = string.Empty;

                foreach (var f in filters)
                {
                    conditions += string.IsNullOrEmpty(conditions) ? " And" : "";
                    conditions += $"{f.Property}.{f.Condition}(\"{f.SearchValue}\")";
                }

                predicate = DynamicExpressionParser.ParseLambda<Organization, bool>(parserConfig, true, conditions);

                organizations = organizations.Where(predicate);
            }

            return organizations.OrderBy(sort.SortString).GetPaged(pageNumber, pageSize);
        }

        ///<inheritdoc cref="IRepository{Organization}"/>
        public override async Task<ApplicationCore.Models.Pagination.PagedResult<Organization>> GetPagedAsync(int pageNumber, int pageSize, IEnumerable<FilterModel> filters, SortModel sort)
        {
            var organizations = GetHydratedOrganization();

            if (filters != null)
            {
                Expression<Func<Organization, bool>> predicate;
                var parserConfig = new ParsingConfig();
                var conditions = string.Empty;

                foreach (var f in filters)
                {
                    conditions += string.IsNullOrEmpty(conditions) ? " And" : "";
                    conditions += $"{f.Property}.{f.Condition}(\"{f.SearchValue}\")";
                }

                predicate = DynamicExpressionParser.ParseLambda<Organization, bool>(parserConfig, true, conditions);

                organizations = organizations.Where(predicate);
            }

            organizations = organizations.OrderBy(sort.SortString);

            return await organizations.AsQueryable().GetPagedAsync(pageNumber, pageSize).ConfigureAwait(false);
        }

        #region private
        private IQueryable<Organization> GetHydratedOrganization()
        {
            return DbContext.Set<Organization>()
                .Include(o => o.Addresses).ThenInclude(a => a.Contact)
                .Include(o => o.Contact);
        }
        #endregion
    }
}
