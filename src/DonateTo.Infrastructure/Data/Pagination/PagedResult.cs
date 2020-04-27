using System.Collections.Generic;

namespace DonateTo.Infrastructure.Data.Pagination
{
    public class PagedResult<T> : PagedResultBase where T : class
    {
        private IEnumerable<T> results;

        public IEnumerable<T> GetResults()
        {
            return results;
        }

        public void SetResults(IEnumerable<T> value)
        {
            results = value;
        }

        public PagedResult()
        {
            SetResults(new List<T>());
        }
    }
}
