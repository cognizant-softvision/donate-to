using Microsoft.AspNetCore.Mvc;
using DonateTo.ApplicationCore.Entities;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Pagination;

namespace DonateTo.WebApi.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class SearchController: Controller
    {
        private readonly ISearchService _searchService;
        public SearchController(ISearchService searchService)
        {
            _searchService = searchService;
        }        

        [HttpGet("/:queryString/:pageNumber/:pageSize")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PagedResult<DonationRequest>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<PagedResult<DonationRequest>>> SearchDonation(string queryString,int page, int pageSize)
        {
            return await this._searchService.SearchDonationRequestAsync(queryString, page, pageSize).ConfigureAwait(false);
        }    
        
    }
}