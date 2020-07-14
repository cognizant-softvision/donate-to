﻿using System.Collections.Generic;

namespace DonateTo.ApplicationCore.Entities
{
    public class Question : EntityBase
    {
        public string Label { get; set; }
        public int Order { get; set; }
        public string ControlType { get; set; }
        public string Placeholder { get; set; }
        public string DefaultValue { get; set; }
        public decimal Weight { get; set; }

        public IEnumerable<QuestionOption> Options { get; set; }
    }
}