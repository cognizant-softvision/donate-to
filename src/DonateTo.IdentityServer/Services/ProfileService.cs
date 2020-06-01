using DonateTo.ApplicationCore.Entities;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DonateTo.IdentityServer.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IUserClaimsPrincipalFactory<User> _claimFactory;
        private readonly UserManager<User> _userManager;

        public ProfileService(IUserClaimsPrincipalFactory<User> claimFactory, UserManager<User> userManager)
        {
            _claimFactory = claimFactory;
            _userManager = userManager;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var sub = context.Subject.GetSubjectId();
            var user = await _userManager.FindByIdAsync(sub);
            var principal = await _claimFactory.CreateAsync(user);

            var claims = principal.Claims.ToList();
            claims = claims.Where(claim => context.RequestedClaimTypes.Contains(claim.Type)).ToList();

            claims.Add(new Claim("user_Id", user.Id.ToString() ?? string.Empty));

            context.IssuedClaims = claims;
        }

        public async Task IsActiveAsync(IsActiveContext context)
        {
            var sub = context.Subject.GetSubjectId();
            var user = await _userManager.FindByNameAsync(sub);
            context.IsActive = user != null;
        }
    }
}
