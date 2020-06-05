using System;
using System.Collections.Generic;
using System.Text;

namespace DonateTo.ApplicationCore.Entities
{
    public class Availability : EntityBase
    {
        public Availability() 
        {
            StartTime = DateTime.MinValue.ToUniversalTime();
            EndTime = DateTime.MinValue.ToUniversalTime();
        }

        public int DayOfWeek { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
