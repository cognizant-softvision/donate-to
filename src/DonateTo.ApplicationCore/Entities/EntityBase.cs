using System;

namespace DonateTo.ApplicationCore.Entities
{
    /// <summary>
    /// Entity Base
    /// </summary>
    public abstract class EntityBase
    {
        /// <summary>
        /// Entity Id
        /// </summary>
        public long Id { get; set; }

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
