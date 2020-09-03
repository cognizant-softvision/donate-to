using System.Collections.Generic;

namespace DonateTo.ApplicationCore.Models.Filtering
{
    public class UserFilterModel : BaseFilterModel
    {
        public string FullName { get; set; }

        public string Email { get; set; }

        public string Organization { get; set; }

        public IEnumerable<long> OrganizationIds { get; set; }

        public UserFilterModel()
        {
            if(OrganizationIds == null)
            {
                OrganizationIds = new List<long>();
            }
        }
    }
}
