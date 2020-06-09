using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DonateTo.IdentityServer.Models
{
    public class NavigationListViewModel
    {

        public string FieldName { get; set; }

        public IDictionary<string, string>[] Dict { get; set; }

        public IEnumerable<string> FieldNames { get; set; }

    }
}
