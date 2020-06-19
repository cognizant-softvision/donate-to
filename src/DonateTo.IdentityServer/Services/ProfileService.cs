using DonateTo.ApplicationCore.Entities;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Linq;
using IdentityModel;
using IdentityServer4.Extensions;
using DonateTo.ApplicationCore.Interfaces.Services;
using Microsoft.EntityFrameworkCore.Internal;

namespace DonateTo.IdentityServer.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IUserClaimsPrincipalFactory<User> _claimFactory;
        private readonly IOrganizationService _organizationService;
        private readonly UserManager<User> _userManager;

        public ProfileService(IOrganizationService organizationService, IUserClaimsPrincipalFactory<User> claimFactory, UserManager<User> userManager)
        {
            _claimFactory = claimFactory;
            _userManager = userManager;
            _organizationService = organizationService;
        }

        /// <summary>
        /// Overridden method that gets call while get profile data
        /// </summary>
        /// <param name="context">profile context</param>
        /// <returns></returns>
        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var sub = context.Subject.GetSubjectId();
            var user = await _userManager.FindByIdAsync(sub);
            var principal = await _claimFactory.CreateAsync(user);


            var claims = principal.Claims.ToList();
            claims = claims.Where(claim => context.RequestedClaimTypes.Contains(claim.Type)).ToList();

            var userOrganizations = await _organizationService.GetByUserIdAsync(user.Id);
            if (userOrganizations.Any())
                claims.AddRange(userOrganizations.Select(o => new Claim("organization", o.Name)));

            var roleClaimName = JwtClaimTypes.Role;
            var existingRoles = context.IssuedClaims.Where(c => c.Type == roleClaimName).Select(c => c.Value);
            var roles = await _userManager.GetRolesAsync(user);

            claims.AddRange(roles.Where(r => !existingRoles.Contains(r)).Select(r => new Claim(roleClaimName, r)).ToArray());

            context.IssuedClaims.AddRange(claims);
        }

        /// <summary>
        /// Overridden method that gets call while checking if profile is active
        /// </summary>
        /// <param name="context">profile active context</param>
        /// <returns></returns>
        public async Task IsActiveAsync(IsActiveContext context)
        {
            var user = await _userManager.GetUserAsync(context.Subject);
            context.IsActive = user != null;
        }
    }
}