using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Repositories;
using DonateTo.Infrastructure.Data.EntityFramework;
using DonateTo.Infrastructure.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class QuestionRepository : EntityFrameworkRepository<Question, DonateToDbContext>, IQuestionRepository
    {
        public QuestionRepository(DonateToDbContext dbContext) : base(dbContext) { }

        void IQuestionRepository.BulkUpdate(IEnumerable<Question> entities)
        {
            throw new System.NotImplementedException();
        }

        public async Task BulkUpdateAsync(IEnumerable<Question> updatedQuestions)
        {
            using var transaction = DbContext.Database.BeginTransaction();

            try
            {
                var removedQuestions = await Get(null)
                    .Where(q => !updatedQuestions
                    .Select(uq => uq.Id)
                    .Contains(q.Id)).ToListAsync().ConfigureAwait(false);

                var addedQuestions = updatedQuestions.Where(uq => uq.Id == 0);

                updatedQuestions = updatedQuestions.Where(uq => !addedQuestions.Contains(uq));

                foreach (var question in removedQuestions)
                {
                    await DeleteAsync(question.Id).ConfigureAwait(false);
                }

                foreach (var question in addedQuestions)
                {
                    await AddAsync(question).ConfigureAwait(false);
                }

                foreach (var question in updatedQuestions)
                {
                    await UpdateAsync(question).ConfigureAwait(false);
                }

                await DbContext.SaveChangesAsync().ConfigureAwait(false);
                await transaction.CommitAsync().ConfigureAwait(false);
            }
            catch (Exception)
            {
                await transaction.RollbackAsync().ConfigureAwait(false);
                throw;
            }
        }

        public override IQueryable<Question> Get(Expression<Func<Question, bool>> filter)
        {
            return GetHydratedQuestions();
        }

        #region private
        private IQueryable<Question> GetHydratedQuestions()
        {
            return DbContext.Set<Question>()
                .Include(q => q.ControlType)
                .Include(q => q.Options).ThenInclude(o => o.Question);
        }
        #endregion

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