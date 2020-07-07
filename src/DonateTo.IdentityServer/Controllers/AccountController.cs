using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.IdentityServer.Models;
using DonateTo.Mailer.Entities;
using DonateTo.Mailer.Interfaces;
using IdentityModel;
using IdentityServer4.Events;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DonateTo.IdentityServer.Controllers
{
    public class AccountController : Controller
    {
        private readonly IUserService _userService;
        private readonly IIdentityServerInteractionService _interactionService;
        private readonly IEventService _eventsService;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly IMailSender _mailSender;
        private readonly IWebHostEnvironment _environment;
        private readonly IMapper _mapper;

        public AccountController(
            IUserService userService,
            IIdentityServerInteractionService interactionService,
            IEventService eventsService,
            SignInManager<User> signInManager,
            UserManager<User> userManager,
            RoleManager<Role> roleManager,
            IMailSender mailSender,
            IWebHostEnvironment environment,
            IMapper mapper)
        {
            _userService = userService;
            _interactionService = interactionService;
            _eventsService = eventsService;
            _signInManager = signInManager;
            _userManager = userManager;
            _roleManager = roleManager;
            _mailSender = mailSender;
            _environment = environment;
            _mapper = mapper;
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
            if (button != "Log in")
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
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberLogin, false);

                // validate username/password against service
                if (result.Succeeded)
                {
                    var user = _userService.FirstOrDefault(u => u.Email == model.Email);
                    await _eventsService.RaiseAsync(new UserLoginSuccessEvent(user.Email, user.Id.ToString(), user.FullName));

                    await RegisterToken(user, model.RememberLogin);

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

        [HttpGet]
        public IActionResult LoggedIn()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Register(string returnUrl)
        {
            var model = new UserRegistrationViewModel();
            model.ReturnUrl = returnUrl;
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(UserRegistrationViewModel userRegistrationViewModel)
        {
            if (!ModelState.IsValid)
            {
                return View(userRegistrationViewModel);
            }

            var user = _mapper.Map<User>(userRegistrationViewModel);

            var result = await _userManager.CreateAsync(user, userRegistrationViewModel.Password)
                .ConfigureAwait(false);

            if (result.Succeeded)
            {
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var confirmationLink = Url.Action(nameof(ConfirmEmail), "Account", new { token, email = user.Email, redirectUrl = userRegistrationViewModel.ReturnUrl }, Request.Scheme);

                var bodyMessage = new MessageBody()
                {
                    HtmlBody = $"<p>Please confirm your email clicking <a href='{ confirmationLink }' target='_blank'>here</a></p>"
                };

                var message = new Message(user.Email, "Activate your account", bodyMessage);

                await _mailSender.SendAsync(message);

                var role = await _roleManager.FindByNameAsync("Donor").ConfigureAwait(false);
                result = await _userManager.AddToRoleAsync(user, role.Name).ConfigureAwait(false);

                var rvm = BuildRedirectHomeViewModel(userRegistrationViewModel.ReturnUrl);
                return RedirectToAction("SuccessRegistration", rvm);
            }

            if (!result.Succeeded)
            {
                ModelErrorsHandler(result.Errors);
                return View(userRegistrationViewModel);
            }

            var vm = await BuildLoginViewModelAsync(userRegistrationViewModel.ReturnUrl).ConfigureAwait(false);

            return RedirectToAction("Login", vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            return RedirectToAction(nameof(HomeController.Index), "Home");
        }

        [HttpGet]
        public async Task<IActionResult> Logout(string logoutId)
        {
            var logout = await _interactionService.GetLogoutContextAsync(logoutId).ConfigureAwait(false);

            if (User?.Identity.IsAuthenticated == true)
            {
                // delete local authentication cookie
                await _signInManager.SignOutAsync().ConfigureAwait(false);

                // raise the logout event
                await _eventsService.RaiseAsync(new UserLogoutSuccessEvent(User.GetSubjectId(), User.GetDisplayName())).ConfigureAwait(false);
            }

            return logout?.PostLogoutRedirectUri != null ? (IActionResult) Redirect(logout.PostLogoutRedirectUri) : RedirectToAction("Login");
        }

        [HttpGet]
        public IActionResult SignedUp()
        {
            return View();
        }

        [HttpGet]
        public IActionResult ForgotPassword(string returnUrl)
        {
            var model = new ForgotPasswordViewModel
            {
                ReturnUrl = returnUrl
            };
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordViewModel forgotPasswordViewModel)
        {
            if (!ModelState.IsValid)
            {
                return View(forgotPasswordViewModel);
            }

            var user = await _userManager.FindByEmailAsync(forgotPasswordViewModel.Email);

            if (user == null)
            {
                return View("Error");
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var resetLink = Url.Action(nameof(ResetPassword), "Account", new { token, email = user.Email }, Request.Scheme);

            var bodyMessage = new MessageBody()
            {
                HtmlBody = $"<p>Please click <a href='{ resetLink }' target='_blank'>here</a> to reset your password.</p>"
            };
            
            var message = new Message(user.Email, "Reset your password", bodyMessage);

            await _mailSender.SendAsync(message);

            var rvm = BuildRedirectHomeViewModel(forgotPasswordViewModel.ReturnUrl);
            return RedirectToAction("ForgotPasswordConfirmation", rvm);
        }

        [HttpGet]
        public IActionResult ForgotPasswordConfirmation(RedirectHomeViewModel model)
        {
            return View(model);
        }

        [HttpGet]
        public IActionResult ResetPassword(string token, string email)
        {
            var model = new ResetPasswordViewModel { Token = token, Email = email };
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword(ResetPasswordViewModel resetPasswordModel)
        {
            if (!ModelState.IsValid)
                return View(resetPasswordModel);

            var user = await _userManager.FindByEmailAsync(resetPasswordModel.Email);
            if (user == null)
                RedirectToAction(nameof(ResetPasswordConfirmation));

            var resetPassResult = await _userManager.ResetPasswordAsync(user, resetPasswordModel.Token, resetPasswordModel.Password);
            if (!resetPassResult.Succeeded)
            {
                foreach (var error in resetPassResult.Errors)
                {
                    ModelState.TryAddModelError(error.Code, error.Description);
                }

                return View();
            }

            return RedirectToAction(nameof(ResetPasswordConfirmation));
        }

        [HttpGet]
        public IActionResult ResetPasswordConfirmation(RedirectHomeViewModel model)
        {
            return View(model);
        }

        [HttpGet]
        public async Task<IActionResult> ConfirmEmail(string token, string email, string redirectUrl)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return View("Error");

            var result = await _userManager.ConfirmEmailAsync(user, token);

            if (result.Succeeded)
            {
                var rvm = BuildRedirectHomeViewModel(redirectUrl);
                return View (rvm);
            }
            else
                return View("Error");
        }

        [HttpGet]
        public IActionResult SuccessRegistration(RedirectHomeViewModel model)
        {
            return View(model);
        }

        #region private
        private async Task RegisterToken(User user, bool rememberLogin)
        {
            // only set explicit expiration here if user chooses "remember me". 
            // otherwise we rely upon expiration configured in cookie middleware.
            AuthenticationProperties props = null;
            if (AccountOptions.AllowRememberLogin && rememberLogin)
            {
                props = new AuthenticationProperties
                {
                    IsPersistent = true,
                    ExpiresUtc = DateTimeOffset.UtcNow.Add(AccountOptions.RememberMeLoginDuration)
                };
            };

            //assign roles as claims
            var roles = await _userManager.GetRolesAsync(user);
            var roleClaimName = JwtClaimTypes.Role;
            var roleClaims = roles.Select(r => new Claim(roleClaimName, r)).ToArray();
            await HttpContext.SignInAsync(user.Id.ToString(), user.Email, props, roleClaims);

        }

        public RedirectHomeViewModel BuildRedirectHomeViewModel(string redirectUri)
        {
            return new RedirectHomeViewModel
            {
                RedirectUris = redirectUri
            };
        }

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

        private void ModelErrorsHandler(IEnumerable<IdentityError> errors)
        {
            const string duplicatedEmailCode = "DuplicateEmail";
            const string duplicatedUserNameCode = "DuplicateUserName";

            foreach (var error in errors)
            {
                if (error.Code == duplicatedEmailCode)
                {
                    error.Description = "Email registered - please enter another email or sign in.";
                    ModelState.TryAddModelError(error.Code, error.Description);
                }
                else if(error.Code != duplicatedUserNameCode)
                {
                    ModelState.TryAddModelError(error.Code, error.Description);
                }
            }
        }

        #endregion
    }
}
