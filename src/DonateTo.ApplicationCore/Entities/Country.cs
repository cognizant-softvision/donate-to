﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DonateTo.ApplicationCore.Entities
{
    public class Country : EntityBase
    {
        public string SortName { get; set; }
        public string Name { get; set; }
        public int PhoneCode { get; set; }
        public IEnumerable<State> States { get; set; }
    }
}
