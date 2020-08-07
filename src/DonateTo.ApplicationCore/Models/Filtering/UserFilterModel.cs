﻿namespace DonateTo.ApplicationCore.Models.Filtering
{
    public class UserFilterModel : BaseFilterModel
    {
        public string FullName { get; set; }

        public string Email { get; set; }

        public string Organization { get; set; }

        public long OrganizationId { get; set; }
    }
}
