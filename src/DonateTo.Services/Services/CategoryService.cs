using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;

namespace DonateTo.Services
{
    public class CategoryService : BaseService<Category>
    {
        public CategoryService(IRepository<Category> categoryRepository) : base(categoryRepository)
        { }
    }
}