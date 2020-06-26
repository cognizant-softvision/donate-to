using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class QuestionRepository : EntityFrameworkRepository<Question, DonateToDbContext>
    {
        public QuestionRepository(DonateToDbContext dbContext) : base(dbContext) { }

        ///<inheritdoc cref="IRepository{Question}"/>
        public override async Task<IQueryable<Question>> GetAsync(Expression<Func<Question, bool>> filter)
        {
            var hydratedQuestions = GetHydratedQuestions();

            if (filter != null)
            {
                hydratedQuestions = hydratedQuestions.Where(filter);
            }

            return await Task.FromResult(hydratedQuestions).ConfigureAwait(false);
        }

        #region private
        private IQueryable<Question> GetHydratedQuestions()
        {
            return DbContext.Set<Question>()
                .Include(q => q.Options);
        }
        #endregion
    }
}
