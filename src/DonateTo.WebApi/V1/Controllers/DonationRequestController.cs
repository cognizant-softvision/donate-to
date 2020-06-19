using Microsoft.AspNetCore.Mvc;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using System.Threading.Tasks;
using DonateTo.Mailer.Interfaces;
using System.Net;
using System.Linq;

namespace DonateTo.WebApi.V1.Controllers
{
    ///<inheritdoc cref="BaseApiController{DonationRequest}"/>
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class DonationRequestController : BaseApiController<DonationRequest>
    {
        private readonly IDonationRequestService _donationRequestService;
        private const string _clientClaim = "client";

        public DonationRequestController(
            IDonationRequestService donationRequestService,
            IMailSender mailSender) : base(donationRequestService)
        {
            _donationRequestService = donationRequestService;
        }

        public override async Task<IActionResult> Post([FromBody] DonationRequest value)
        {
            var client = User.Claims.FirstOrDefault(claim => claim.Type == _clientClaim)?.Value;
            var request = await base.Post(value).ConfigureAwait(false);
            
            var code = (HttpStatusCode)request
                .GetType()
                .GetProperty("StatusCode")
                .GetValue(request, null);

            if (code == HttpStatusCode.OK)
            {
                await _donationRequestService.SendNewRequestMailToOrganizationUsersAsync(
                    (DonationRequest)((OkObjectResult)request).Value, 
                    client).ConfigureAwait(false);
            }

            return request;
        }
    }
}