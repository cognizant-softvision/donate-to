using System;
using System.Collections.Generic;

namespace DonateTo.ApplicationCore.Entities
{
    public class State : EntityBase
    {
        public string Name { get; set; }
        public long CountryId { get; set; }
        public IEnumerable<City> Cities { get; set; }
    }
}
