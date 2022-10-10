using System;

namespace Sharp.CMS.ViewModels.InnerPage
{
    public class InnerNewPageFooterGrid
    {
        public int InnerPageFooterId { get; set; }
        public string PageFooterName { get; set; }
        public string Status { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string IsDefault { get; set; }
    }
}