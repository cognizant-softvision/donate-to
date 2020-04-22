using System;

namespace DonateTo.ApplicationCore.Entities
{
    public abstract class Entity
    {
        public long Id { get; set; }
        public User CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public User UpdateBy { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}
