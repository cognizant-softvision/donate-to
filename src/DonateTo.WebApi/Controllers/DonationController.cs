using Microsoft.AspNetCore.Mvc;
using DonateTo.ApplicationCore.Entities;
using Microsoft.AspNetCore.Http;
using System.Net.Mime;
using System.Collections.Generic;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Models.Pagination;

namespace DonateTo.WebApi.Controllers
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
            _donationService = donationService;   
            _unitOfWork = unitOfWork;
        }
        
        [HttpGet("/:pageNumber/:pageSize")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PagedResult<Donation>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<PagedResult<Donation>>> GetPagedAsync(int page, int pageSize)
        {
            return await _donationService.GetPagedAsync(page, pageSize);
        }
        
        [HttpGet("/:id")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Donation))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Donation>> Get(int id)
        {
            return await _donationService.GetAsync(id);
        }

        [HttpDelete("/:id")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(void))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> Delete(int id)
        {
            await _donationService.DeleteAsync(id);
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

            await _donationService.UpdateAsync(donation);
            await _unitOfWork.SaveAsync();
            return Ok();
        }
        
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Donation))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Consumes(MediaTypeNames.Application.Json)]
        public async Task<Donation> Post(Donation donation)
        {
           var finalDonation = await _donationService.CreateAsync(donation);
           await _unitOfWork.SaveAsync();
           return finalDonation;

        }
    }
}