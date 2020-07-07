using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Models.Filtering;

namespace DonateTo.Services
{
    public class CategoryService : BaseService<Category, BaseFilterModel>
    {
        public CategoryService(
            IRepository<Category> categoryRepository,
            IUnitOfWork unitOfWork) : base(categoryRepository, unitOfWork) 
        {
        }
    }
}