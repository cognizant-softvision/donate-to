using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DonateTo.ApplicationCore.Entities
{
    /// <summary>
    /// User 
    /// </summary>
    public class User : IdentityUser<long>
    {
        /// <summary>
        /// First Name
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// Last Name
        /// </summary>
        public string LastName { get; set; }

        /// <summary>
        /// Identity Number
        /// </summary>
        public string IdentityNumber { get; set; }

        /// <summary>
        /// Is Enabled
        /// </summary>
        public bool IsEnabled { get; set; }

        /// <summary>
        /// Created by
        /// </summary>
        public string CreatedBy { get; set; }

        /// <summary>
        /// Created Date
        /// </summary>
        public DateTime CreatedDate { get; set; }

        /// <summary>
        /// Updated By
        /// </summary>
        public string UpdateBy { get; set; }

        /// <summary>
        /// Updated Date
        /// </summary>
        public DateTime UpdateDate { get; set; }

        [NotMapped]
        public string FullName { get => FirstName + " " + LastName; }

        public virtual ICollection<UserClaim> Claims { get; set; }
        public virtual ICollection<UserLogin> Logins { get; set; }
        public virtual ICollection<UserToken> Tokens { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }
        public IEnumerable<UserOrganization> UserOrganizations { get; set; }
    }
}
