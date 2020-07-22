using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Repositories;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Filtering;
using DonateTo.ApplicationCore.Models.Pagination;
using LinqKit;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DonateTo.Services
{
    public class QuestionService : BaseService<Question, QuestionFilterModel>, IQuestionService
    {
        private readonly IQuestionRepository _questionRepository;

        public QuestionService(
            IQuestionRepository questionRepository,
            IUnitOfWork unitOfWork) : base(questionRepository, unitOfWork)
        {
            _questionRepository = questionRepository;
        }

        ///<inheritdoc cref="BaseService{Question, QuestionFilterModel}"/>
        public override PagedResult<Question> GetPagedFiltered(QuestionFilterModel filter)
        {
            var predicate = GetPredicate(filter);

            return _questionRepository.GetPaged(filter.PageNumber, filter.PageSize, predicate, GetSort(filter));
        }

        ///<inheritdoc cref="BaseService{Question, QuestionFilterModel}"/>
        public override async Task<PagedResult<Question>> GetPagedFilteredAsync(QuestionFilterModel filter)
        {
            var predicate = GetPredicate(filter);

            return await _questionRepository.GetPagedAsync(filter.PageNumber, filter.PageSize, predicate, GetSort(filter)).ConfigureAwait(false);
        }

        ///<inheritdoc cref="IQuestionService"/>
        public async Task BulkUpdateAsync(IEnumerable<Question> updatedQuestions)
        {
            await _questionRepository.BulkUpdateAsync(updatedQuestions).ConfigureAwait(false);        
        }

        ///<inheritdoc cref="IQuestionService"/>
        public void BulkUpdate(IEnumerable<Question> updatedQuestions)
        {
            _questionRepository.BulkUpdate(updatedQuestions);
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Globalization", "CA1307:Specify StringComparison", Justification = "<Pending>")]
        protected override Expression<Func<Question, bool>> GetPredicate(QuestionFilterModel filter)
        {
            var predicate = base.GetPredicate(filter);

            if (!string.IsNullOrEmpty(filter.Label))
            {
                predicate = predicate.And(p => p.Label.Contains(filter.Label));
            }

            if (!string.IsNullOrEmpty(filter.Placeholder))
            {
                predicate = predicate.And(p => p.Placeholder.Contains(filter.Placeholder));
            }

            if (!string.IsNullOrEmpty(filter.Type))
            {
                predicate = predicate.And(p => p.ControlType.Name.Contains(filter.Type));
            }

            return predicate;
        }
    }
}