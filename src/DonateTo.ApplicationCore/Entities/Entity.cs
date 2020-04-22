﻿using System;
using DonateTo.ApplicationCore.Interfaces;

namespace DonateTo.ApplicationCore.Entities
{
    public abstract class Entity<TKey> : IEntity where TKey : IComparable, IFormattable
    {
        public TKey Id { get; set; }
        public long CreatedAt { get; set; }
    }
}
