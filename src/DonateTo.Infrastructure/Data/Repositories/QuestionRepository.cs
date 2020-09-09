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
using DonateTo.Infrastructure.Extensions;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class QuestionRepository : EntityFrameworkRepository<Question, DonateToDbContext>, IQuestionRepository
    {
        public QuestionRepository(DonateToDbContext dbContext) : base(dbContext) { }

        public void BulkUpdate(IEnumerable<Question> updatedQuestions)
        {
            using var transaction = DbContext.Database.BeginTransaction();

            try
            {
                var removedQuestions = Get(null)
                    .Where(q => !updatedQuestions
                    .Select(uq => uq.Id)
                    .Contains(q.Id)).ToList();

                var addedQuestions = updatedQuestions.Where(uq => uq.Id == 0);

                updatedQuestions = updatedQuestions.Where(uq => !addedQuestions.Contains(uq));

                foreach (var question in removedQuestions)
                {
                    Delete(question.Id);
                }

                foreach (var question in addedQuestions)
                {
                    Add(question);
                }

                foreach (var question in updatedQuestions)
                {
                    Update(question);
                }

                DbContext.SaveChanges();
                transaction.Commit();
            }
            catch (Exception)
            {
                transaction.Rollback();
                throw;
            }
        }

        public async Task BulkUpdateAsync(IEnumerable<Question> updatedQuestions)
        {
            using var transaction = await DbContext.Database.BeginTransactionAsync().ConfigureAwait(false);

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

        public override Task<IQueryable<Question>> GetAsync(Expression<Func<Question, bool>> filter)
        {
            var questions = GetHydratedQuestions();

            if (filter != null)
            {
                questions = questions.Where(filter);
            }

            return Task.FromResult(questions);
        }

        ///<inheritdoc cref="IRepository{Organization}"/>
        public override ApplicationCore.Models.Pagination.PagedResult<Question>
            GetPaged(int page, int pageSize, Expression<Func<Question, bool>> filter = null, string sort = "")
        {
            var questions = GetHydratedQuestions()
                .FilterAndSort(filter, sort);

            return questions.GetPaged(page, pageSize);
        }

        ///<inheritdoc cref="IRepository{Organization}"/>
        public override async Task<ApplicationCore.Models.Pagination.PagedResult<Question>>
            GetPagedAsync(int page, int pageSize, Expression<Func<Question, bool>> filter = null, string sort = "")
        {
            var questions = GetHydratedQuestions()
                .FilterAndSort(filter, sort);

            return await questions.GetPagedAsync(page, pageSize).ConfigureAwait(false);
        }

        public async Task SoftDeleteQuestion(long questionId)
        {
            using var transaction = await DbContext.Database.BeginTransactionAsync().ConfigureAwait(false);

            try
            {
                var questionToSoftDelete = Get(null)
                    .Include(q => q.Options)
                    .Where(q => q.Id == questionId)
                    .FirstOrDefault();

                if (questionToSoftDelete.Options.ToList().Count > 0)
                {
                    questionToSoftDelete.Options.ToList().ForEach(qo => DbContext.QuestionOption.Remove(qo));
                }

                DbContext.Question.Remove(questionToSoftDelete);
                await DbContext.SaveChangesAsync().ConfigureAwait(false);
                await transaction.CommitAsync().ConfigureAwait(false);
            }
            catch (Exception)
            {
                await transaction.RollbackAsync().ConfigureAwait(false);
                throw;
            }
        }


        #region private
        private IQueryable<Question> GetHydratedQuestions()
        {
            return DbContext.Set<Question>()
                .Include(q => q.Options)
                .Include(q => q.ControlType);
        }
        #endregion
    }
}