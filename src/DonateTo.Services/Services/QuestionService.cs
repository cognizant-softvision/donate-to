using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Models.Filtering;
using DonateTo.ApplicationCore.Models.Pagination;
using LinqKit;
using System;
using System.Threading.Tasks;

namespace DonateTo.Services
{
    public class QuestionService : BaseService<Question, QuestionFilterModel>
    {
        private readonly IRepository<Question> _questionRepository;
        private readonly IUnitOfWork _unitOfWork;

        public QuestionService(
            IRepository<Question> questionRepository,
            IUnitOfWork unitOfWork) : base(questionRepository, unitOfWork)
        {
            _questionRepository = questionRepository;
            _unitOfWork = unitOfWork;
        }

        public override async Task<PagedResult<Question>> GetPagedFilteredAsync(QuestionFilterModel filter)
        {
            var predicate = PredicateBuilder.New<Question>();

            if (filter.UpdateDateBegin != null)
            {
                predicate = predicate.Or(p => p.UpdateDate >= filter.UpdateDateBegin);
            }

            if (filter.UpdateDateEnd != null)
            {
                predicate = predicate.Or(p => p.UpdateDate <= filter.UpdateDateEnd);
            }

            if (!string.IsNullOrEmpty(filter.Label))
            {
                predicate = predicate.And(p => p.Label.Contains(filter.Label, StringComparison.InvariantCulture));
            }

            if (!string.IsNullOrEmpty(filter.Placeholder))
            {
                predicate = predicate.And(p => p.Placeholder.Contains(filter.Placeholder, StringComparison.InvariantCulture));
            }

            if (!string.IsNullOrEmpty(filter.Type))
            {
                predicate = predicate.And(p => p.ControlType.Name.Contains(filter.Type, StringComparison.InvariantCulture));
            }


            return await _questionRepository.GetPagedAsync(filter.PageNumber, filter.PageSize, predicate, GetSort(filter)).ConfigureAwait(false);
        }
    }
}