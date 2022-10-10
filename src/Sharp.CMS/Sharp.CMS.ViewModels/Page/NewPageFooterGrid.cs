using System;

namespace Sharp.CMS.ViewModels.Page
{
    public class NewPageFooterGrid
    {
        public int PageFooterId { get; set; }
        public string PageFooterName { get; set; }
        public string Status { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string IsDefault { get; set; }
    }
}