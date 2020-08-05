using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Models.Filtering;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IQuestionService : IBaseService<Question, QuestionFilterModel>
    {
        /// <summary>
        /// Updates a Bulk of questions.
        /// </summary>
        /// <param name="updatedQuestions">List of questions</param>
        void BulkUpdate(IEnumerable<Question> updatedQuestions);

        /// <summary>
        /// Updates a Bulk of questions async.
        /// </summary>
        /// <param name="updatedQuestions">List of questions</param>
        Task BulkUpdateAsync(IEnumerable<Question> updatedQuestions);

        /// <summary>
        /// Update the priority of the DonationRequest
        /// </summary>
        /// <param name="questionResults"> List of questions answers</param>
        /// <returns></returns>
        decimal CalculateWeightQuestionAsync(QuestionResult questionResults);
    }
}
