using System;
using System.Linq;
using System.Threading.Tasks;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.IdentityServer.Models;
using IdentityServer4.Events;
using IdentityServer4.Models;
using IdentityServer4.Services;
using IdentityServer4.Stores;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DonateTo.IdentityServer.Controllers
{
    public class AccountController : Controller
    {
        private readonly IUserService _userService;
        private readonly IIdentityServerInteractionService _interactionService;
        private readonly IClientStore _clientStore;
        private readonly IEventService _eventsService;
        IAuthenticationSchemeProvider _schemeProvider;

        public AccountController(
            IUserService userService,
            IIdentityServerInteractionService interactionService,
            IClientStore clientStore,
            IEventService eventsService,
            IAuthenticationSchemeProvider schemeProvider)
        {
            _userService = userService;
            _interactionService = interactionService;
            _clientStore = clientStore;
            _eventsService = eventsService;
            _schemeProvider = schemeProvider;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> Login(string returnUrl)
        {
            // build a model so we know what to show on the login page
            var vm = await BuildLoginViewModelAsync(returnUrl);

            return View(vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginInputModel model, string button)
        {
            // check if we are in the context of an authorization request
            var context = await _interactionService.GetAuthorizationContextAsync(model.ReturnUrl);

            // the user clicked the "cancel" button
            if (button != "login")
            {
                if (context != null)
                {
                    // if the user cancels, send a result back into IdentityServer as if they 
                    // denied the consent (even if this client does not require consent).
                    // this will send back an access denied OIDC error response to the client.
                    await _interactionService.GrantConsentAsync(context, ConsentResponse.Denied);

                    return Redirect(model.ReturnUrl);
                }
                else
                {
                    // since we don't have a valid context, then we just go back to the home page
                    return Redirect("~/");
                }
            }

            if (ModelState.IsValid)
            {
                // validate username/password against in-memory store
                if (_userService.ValidateCredentials(model.Email, model.Password))
                {
                    var user = _userService.FirstOrDefault(u => u.Email == model.Email);
                    await _eventsService.RaiseAsync(new UserLoginSuccessEvent(user.Email, user.Id, user.FullName));

                    // only set explicit expiration here if user chooses "remember me". 
                    // otherwise we rely upon expiration configured in cookie middleware.
                    AuthenticationProperties props = null;
                    if (AccountOptions.AllowRememberLogin && model.RememberLogin)
                    {
                        props = new AuthenticationProperties
                        {
                            IsPersistent = true,
                            ExpiresUtc = DateTimeOffset.UtcNow.Add(AccountOptions.RememberMeLoginDuration)
                        };
                    };

                    // issue authentication cookie with subject ID and email
                    await HttpContext.SignInAsync(user.Id, user.Email, props);

                    if (context != null || Url.IsLocalUrl(model.ReturnUrl))
                    {
                        return Redirect(model.ReturnUrl);
                    }
                    else if (string.IsNullOrEmpty(model.ReturnUrl))
                    {
                        return Redirect("~/");
                    }
                    else
                    {
                        // user might have clicked on a malicious link - should be logged
                        throw new Exception("Invalid return URL");
                    }
                }

                await _eventsService.RaiseAsync(new UserLoginFailureEvent(model.Email, "Invalid credentials"));
                ModelState.AddModelError(string.Empty, AccountOptions.InvalidCredentialsErrorMessage);
            }

            // something went wrong, show form with error
            var vm = await BuildLoginViewModelAsync(model);
            return View(vm);
        }

        public IActionResult Logout()
        {
            return View();
        }


        public IActionResult SignIn()
        {
            return View();
        }

        #region private
        private async Task<LoginViewModel> BuildLoginViewModelAsync(string returnUrl)
        {
            var context = await _interactionService.GetAuthorizationContextAsync(returnUrl);

            return new LoginViewModel
            {
                AllowRememberLogin = AccountOptions.AllowRememberLogin,
                ReturnUrl = returnUrl,
                Email = context?.LoginHint
            };
        }

        private async Task<LoginViewModel> BuildLoginViewModelAsync(LoginInputModel model)
        {
            var vm = await BuildLoginViewModelAsync(model.ReturnUrl);
            vm.Email = model.Email;
            vm.RememberLogin = model.RememberLogin;
            return vm;
        }

        #endregion
    }
}
