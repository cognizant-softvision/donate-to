using DonateTo.ApplicationCore.Common;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Filtering;
using DonateTo.WebApi.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DonateTo.WebApi.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class QuestionController : BaseApiController<Question, QuestionFilterModel>
    {
        private readonly IQuestionService _questionService;
        public QuestionController(IQuestionService questionService) : base(questionService)
        {
            _questionService = questionService;
        }

        /// <summary>
        /// Update a Questions list
        /// </summary>
        /// <param name="value">Question list to update.</param>
        /// <returns>Updated Questions.</returns>
        [HttpPut(Name = "[controller]_[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> PutQuestionsAsync([FromBody] IEnumerable<Question> value)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                try
                {
                    var userRole = User.Claims.FirstOrDefault(claim => claim.Type.Contains(Claims.Role))?.Value;

                    if (userRole != Roles.Superadmin && userRole != Roles.Admin)
                    {
                        return Unauthorized();
                    }

                    if(value.Sum(w => w.Weight) != 100)
                    {
                        return BadRequest("Invalid batch, the sum of weights must reach 100.");
                    }

                    await _questionService.BulkUpdateAsync(value).ConfigureAwait(false);

                    return Ok();
                }
                catch (ArgumentNullException ex)
                {
                    return NotFound(ex);
                }
                catch (InvalidOperationException ex)
                {
                    return BadRequest(ex);
                }
            }
        }
    }
}