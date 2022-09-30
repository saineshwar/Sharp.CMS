using System;

namespace Sharp.CMS.ViewModels.Page
{
    public class PageWidgetGrid
    {
        public int PageWidgetId { get; set; }
        public string PageWidgetName { get; set; }
        public string Status { get; set; }
        public DateTime? CreatedOn { get; set; }
    }
}