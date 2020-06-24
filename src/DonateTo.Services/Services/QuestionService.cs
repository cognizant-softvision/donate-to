using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;

namespace DonateTo.Services.Services
{
    public class QuestionService : BaseService<Question>
    {
        public QuestionService(
            IRepository<Question> categoryRepository,
            IUnitOfWork unitOfWork) : base(categoryRepository, unitOfWork)
        {
        }
    }
}
