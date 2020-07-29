using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DonateTo.ApplicationCore.Entities
{
    //[Table("Log")]
    public class Log
    {
        [Column("message")]
        public string Message { get; set; }
        [Column("message_template")]
        public string MessageTemplate { get; set; }
        [Column("level")]
        public int Level { get; set; }
        [Key]
        [Column("timestamp")]
        public DateTime TimeStamp { get; set; }
        [Column("exception")]
        public string Exception { get; set; }
        [Column("log_event")]
        public string LogEvent { get; set; }
    }
}
