﻿namespace DonateTo.ApplicationCore.Entities
{
    public class QuestionOption : EntityBase
    {
        public string Label { get; set; }
        public string Value { get; set; }
        public decimal Weight { get; set; }
        public long QuestionId { get; set; }
        public Question Question { get; set; }
    }
}