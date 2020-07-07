using Microsoft.AspNetCore.Mvc;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Filtering;

namespace DonateTo.WebApi.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class CategoryController : BaseApiController<Category, BaseFilterModel>
    {
        public CategoryController(IBaseService<Category, BaseFilterModel> categoryService) : base(categoryService)
        {
        }
    }
}