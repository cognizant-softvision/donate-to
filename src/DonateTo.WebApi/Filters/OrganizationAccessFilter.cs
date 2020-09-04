using DonateTo.ApplicationCore.Common;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.WebApi.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Globalization;
using System.Linq;

namespace DonateTo.WebApi.Filters
{
    public class OrganizationAccessFilter : IActionFilter
    {
        private readonly IOrganizationService _organizationService;

        public OrganizationAccessFilter(IOrganizationService organizationService)
        {
            _organizationService = organizationService;
        }

        /// <inheritdoc cref="IActionFilter"/>
        public void OnActionExecuted(ActionExecutedContext context)
        {
        }

        /// <inheritdoc cref="IActionFilter"/>
        public void OnActionExecuting(ActionExecutingContext context)
        {
            var user = (context.Controller as ControllerBase).User;

            if (!(user.HasClaim(c => c.Type == Claims.UserId) && user.HasClaim(c => c.Type == Claims.Role)))
            {
                context.Result = new UnauthorizedObjectResult("Malformed Token error.");
                return;
            }

            var role = user.Claims.FirstOrDefault(c => c.Type == Claims.Role).Value;

            switch (role)
            {
                case Roles.Superadmin:
                case Roles.Admin:
                case Roles.Organization:                    
                    break;
                case Roles.Donor:
                    context.Result = new UnauthorizedObjectResult("User does not have access privileges.");
                    break;
                default:
                    context.Result = new UnauthorizedObjectResult("User does not have access privileges.");
                    break;
            }
        }
    }
}
