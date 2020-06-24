using DonateTo.WebApi.Authorization.Requirements;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DonateTo.WebApi.Authorization.Handler
{
    public class OrganizationAuthorizeHandler : AuthorizationHandler<OrganizationAuthorizeRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, OrganizationAuthorizeRequirement requirement)
        {
            if (!context.User.HasClaim(c => c.Type == ClaimTypes.UserId)
            {
                //TODO: Use the following if targeting a version of
                //.NET Framework older than 4.6:
                //      return Task.FromResult(0);
                return Task.CompletedTask;
            }
        }
    }
}
