using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Models.Filtering;

namespace DonateTo.Services
{
    public class QuestionService : BaseService<Question, BaseFilterModel>
    {
        public QuestionService(
            IRepository<Question> categoryRepository,
            IUnitOfWork unitOfWork) : base(categoryRepository, unitOfWork)
        {
        }
    }
}