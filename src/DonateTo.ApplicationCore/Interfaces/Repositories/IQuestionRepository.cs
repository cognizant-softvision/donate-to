using DonateTo.ApplicationCore.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Repositories
{
    public interface IQuestionRepository : IRepository<Question>
    {
        /// <summary>
        /// Update a bulk of questions.
        /// </summary>
        /// <param name="updatedQuestions">updatedQuestions.</param>
        void BulkUpdate(IEnumerable<Question> updatedQuestions);

        /// <summary>
        /// Update a bulk of questions async.
        /// </summary>
        /// <param name="updatedQuestions">updatedQuestions.</param>
        Task BulkUpdateAsync(IEnumerable<Question> updatedQuestions);

        Task SoftDeleteQuestion(Question question);

    }
}
