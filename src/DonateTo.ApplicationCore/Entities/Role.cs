using Microsoft.AspNetCore.Identity;
using System;

namespace DonateTo.ApplicationCore.Entities
{
    /// <summary>
    /// System Role
    /// </summary>
    public class Role : IdentityRole<long>
    {
        /// <summary>
        /// Description
        /// </summary>
        public string Description { get; set; }

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
    }
}
