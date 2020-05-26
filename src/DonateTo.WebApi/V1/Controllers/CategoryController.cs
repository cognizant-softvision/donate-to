using Microsoft.AspNetCore.Mvc;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Interfaces;

namespace DonateTo.WebApi.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class CategoryController : BaseApiController<Category>
    {
        public CategoryController(IBaseService<Category> categoryService, IUnitOfWork unitOfWork) :
            base(categoryService, unitOfWork)
        {
        }
    }
}