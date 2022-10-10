using System;

namespace Sharp.CMS.ViewModels.InnerPage
{
    public class InnerPageWidgetGrid
    {
        public int InnerPageWidgetId { get; set; }
        public string PageWidgetName { get; set; }
        public string Status { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string IsDefault { get; set; }
    }
}