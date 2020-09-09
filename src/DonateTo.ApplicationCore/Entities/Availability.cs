using DonateTo.ApplicationCore.Interfaces;
using System;

namespace DonateTo.ApplicationCore.Entities
{
    public class Availability : EntityBase, IIsDeleted
    {
        public Availability() 
        {
            StartTime = DateTime.MinValue.ToUniversalTime();
            EndTime = DateTime.MinValue.ToUniversalTime();
        }

        public int DayOfWeek { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsDeleted { get; set; }
    }
}
