using DonateTo.ApplicationCore.Models;

namespace DonateTo.IdentityServer.Models
{
    public class RoleModelView : RoleModel
    {
        /// <summary>
        /// Defines if the Role is assigned to the user or not.
        /// </summary>
        public bool Assigned { get; set; }
    }
}
