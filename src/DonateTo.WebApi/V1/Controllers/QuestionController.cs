using DonateTo.ApplicationCore.Common;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Filtering;
using DonateTo.WebApi.Common;
using DonateTo.WebApi.Filters;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    public class QuestionController : BaseApiController<Question, QuestionFilterModel>
    {
        private readonly IQuestionService _questionService;
        private readonly IDonationRequestService _donationRequestService;
        private const string messageErrorWeight = "Invalid batch, the sum of weights must reach 100.";
        public QuestionController(IQuestionService questionService, IDonationRequestService donationRequestService) : base(questionService)
        {
            _questionService = questionService;
            _donationRequestService = donationRequestService;
        }

        /// <summary>
        /// Update a Questions list
        /// </summary>
        /// <param name="value">Question list to update.</param>
        /// <returns>Updated Questions.</returns>
        [HttpPut(Name = "[controller]_[action]")]
        [ServiceFilter(typeof(SuperAdminAccessFilter))]
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

                    if (value.Sum(w => w.Weight) != 100)
                    {
                        return BadRequest(messageErrorWeight);
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

        [HttpPut("CalculateWeightQuestionAsync")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CalculateWeightQuestionAsync([FromBody] QuestionResult value)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                try
                {
                    var priorityValue = _questionService.CalculateWeightQuestionAsync(value);
                    var donationRequest = await _donationRequestService.GetAsync(value.DonationRequestId).ConfigureAwait(false);
                    var username = User.Claims.FirstOrDefault(claim => claim.Type == Claims.UserName)?.Value;
                    donationRequest.Priority = Convert.ToInt32(priorityValue);
                    await _donationRequestService.UpdateAsync(donationRequest,donationRequest.Id, username).ConfigureAwait(false);
                    return Ok(value);
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

        /// <summary>
        /// Soft Deletes a Question
        /// </summary>
        /// <param name="id">Question Id</param>
        /// <param name="question">Question</param>
        /// <returns>Question soft deleted.</returns>
        [HttpPut(Name = "[controller]_[action]")]
        public async Task<IActionResult> SoftDelete(long id, [FromBody] Question question)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                try
                {
                    await _questionService.SoftDelete(question).ConfigureAwait(false);

                    return Ok();
                }
                catch (KeyNotFoundException ex)
                {
                    return NotFound(ex);
                }
            }
        }
    }

}