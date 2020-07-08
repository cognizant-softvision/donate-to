using System;

namespace DonateTo.ApplicationCore.Models.Filtering
{
    public abstract class BaseFilterModel
    {
        public int PageSize { get; set; }

        public int PageNumber { get; set; }

        public string OrderBy { get; set; }

        public string OrderDirection { get; set; }

        public DateTime UpdateDateBegin { get; set; }

        public DateTime UpdateDateEnd { get; set; }
    }
}
