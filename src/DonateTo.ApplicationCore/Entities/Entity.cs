using System;

namespace DonateTo.ApplicationCore.Entities
{
    public class Entity<TKey> where TKey : IComparable, IFormattable
    {
        public TKey Id { get; set; }
        public long CreateAt { get; set; }
    }
}
