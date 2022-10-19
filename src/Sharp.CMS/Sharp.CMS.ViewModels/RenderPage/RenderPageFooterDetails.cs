using System;
using System.ComponentModel.DataAnnotations;

namespace Sharp.CMS.ViewModels.RenderPage
{
    public class RenderPageFooterDetails
    {
        public int PageFooterId { get; set; }
        public string PageFooterName { get; set; }
        public string PageFooterDetails_EN { get; set; }
        public string PageFooterDetails_LL { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public bool Status { get; set; }
        public bool IsDefault { get; set; }
    }
}