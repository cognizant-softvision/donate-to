using Microsoft.AspNetCore.Mvc;
using DonateTo.ApplicationCore.Entities;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Pagination;
using Microsoft.AspNetCore.Authorization;

namespace DonateTo.WebApi.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class SearchController: Controller
    {
        private readonly ISearchService _searchService;
        public SearchController(ISearchService searchService)
        {
            _searchService = searchService;
        }

        /// <summary>
        /// Gets a DonationRequest paged result matching given search query.
        /// </summary>
        /// <param name="query">Text search query</param>
        /// <param name="pageNumber">Page start number</param>
        /// <param name="pageSize">Page size</param>
        /// <returns>DonationRequest paged result.</returns>
        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PagedResult<DonationRequest>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<PagedResult<DonationRequest>>> SearchDonation(string query, int pageNumber, int pageSize)
        {
            if (ModelState.IsValid)
            {

                var result = await _searchService.SearchDonationRequestAsync(query, pageNumber, pageSize).ConfigureAwait(false);

                if (result != null)
                {
                    return Ok(result);
                }
                else
                {
                    return NotFound();
                }
            }
            else
            {
                return BadRequest();
            }
        }         
    }
}