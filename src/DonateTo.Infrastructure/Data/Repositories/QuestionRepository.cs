using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Repositories;
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
    public sealed class QuestionRepository : EntityFrameworkRepository<Question, DonateToDbContext>, IQuestionRepository
    {
        public QuestionRepository(DonateToDbContext dbContext) : base(dbContext) { }

        public void BulkUpdate(IEnumerable<Question> updatedQuestions)
        {
            throw new NotImplementedException();
        }

        public Task BulkUpdateAsync(IEnumerable<Question> updatedQuestions)
        {
            throw new NotImplementedException();
        }

        ///<inheritdoc cref="IRepository{Organization}"/>
        public override ApplicationCore.Models.Pagination.PagedResult<Question>
            GetPaged(int page, int pageSize, Expression<Func<Question, bool>> filter = null, string sort = "")
        {
            var organizations = GetHydratedQuestion();

            if (filter != null)
            {
                organizations = organizations.Where(filter);
            }

            if (!string.IsNullOrEmpty(sort))
            {
                organizations = organizations.OrderBy(sort);
            }

            return organizations.GetPaged(page, pageSize);
        }

        ///<inheritdoc cref="IRepository{Organization}"/>
        public override async Task<ApplicationCore.Models.Pagination.PagedResult<Question>>
            GetPagedAsync(int page, int pageSize, Expression<Func<Question, bool>> filter = null, string sort = "")
        {
            var organizations = GetHydratedQuestion();

            if (filter != null)
            {
                organizations = organizations.Where(filter);
            }

            if (!string.IsNullOrEmpty(sort))
            {
                organizations = organizations.OrderBy(sort);
            }

            return await organizations.GetPagedAsync(page, pageSize).ConfigureAwait(false);
        }


        #region private
        private IQueryable<Question> GetHydratedQuestion()
        {
            return DbContext.Set<Question>()
                .Include(q => q.Options)
                .Include(q => q.ControlType);
        }
        #endregion
    }
}