using System;

namespace Sharp.CMS.ViewModels.Page
{
    public class NewPageHeaderGrid
    {
        public int PageHeaderId { get; set; }
        public string PageHeaderName { get; set; }
        public string Status { get; set; }
        public DateTime? CreatedOn { get; set; }
    }
}