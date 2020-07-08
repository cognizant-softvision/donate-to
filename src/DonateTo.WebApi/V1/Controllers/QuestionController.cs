using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Filtering;
using Microsoft.AspNetCore.Mvc;

namespace DonateTo.WebApi.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class QuestionController : BaseApiController<Question, BaseFilterModel>
    {
        public QuestionController(IBaseService<Question, BaseFilterModel> questionService) : base(questionService)
        {
        }
    }
}