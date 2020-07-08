using DonateTo.ApplicationCore.Common;

namespace DonateTo.ApplicationCore.Models
{
    public class SortModel
    {
        public string Key { get; set; }
        public string Order { get; set; }

        public string SortString { get => Key + " " + Order; }

    public SortModel() 
        {
            Key = "Id";
            Order = SortDirection.Ascending;
        }
    }
}
