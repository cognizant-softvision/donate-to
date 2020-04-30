using DonateTo.IdentityServer.Models;

namespace DonateTo.IdentityServer
{
    public class LoginViewModel : LoginInputModel
    {
        public bool AllowRememberLogin { get; set; } = true;
    }
}