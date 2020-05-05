using Microsoft.AspNetCore.Mvc;
using DonateTo.ApplicationCore.Entities;
using Microsoft.AspNetCore.Http;
using System.Net.Mime;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Models.Pagination;

namespace DonateTo.WebApi.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class DonationController: Controller
    {
        private readonly IDonationService _donationService;
        private readonly IUnitOfWork _unitOfWork; 
        public DonationController(IDonationService donationService, IUnitOfWork unitOfWork)
        {
            this._donationService = donationService;   
            this._unitOfWork = unitOfWork;
        }
        
        [HttpGet("/:pageNumber/:pageSize")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PagedResult<Donation>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<PagedResult<Donation>>> GetPaged(int page, int pageSize)
        {
            return await this._donationService.GetPagedAsync(page, pageSize);
        }

        [HttpGet("/:queryString/:pageNumber/:pageSize")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PagedResult<Donation>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<PagedResult<Donation>>> SearchDonation(string queryString,int page, int pageSize)
        {
            return await this._donationService.SearchDonationAsync(queryString, page, pageSize);
        }
        
        [HttpGet("/:id")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Donation))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Donation>> Get(int id)
        {
            return await this._donationService.GetAsync(id);
        }

        [HttpDelete("/:id")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(void))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> Delete(int id)
        {
            await this._donationService.DeleteAsync(id);
            return Ok();
        }

        [HttpPut("/:id")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(void))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Consumes(MediaTypeNames.Application.Json)]
        public async Task<ActionResult> Update(int id, Donation donation)
        {
            if(id != donation.Id) {
                return new BadRequestResult();
            }

            await this._donationService.UpdateAsync(donation);
            await this._unitOfWork.SaveAsync();
            return Ok();
        }
        
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Donation))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Consumes(MediaTypeNames.Application.Json)]
        public async Task<Donation> Post(Donation donation)
        {
           var finalDonation = await this._donationService.CreateAsync(donation);
           await this._unitOfWork.SaveAsync();
           return finalDonation;

        }
    }
}