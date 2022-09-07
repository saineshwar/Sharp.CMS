using System.ComponentModel.DataAnnotations;

namespace Sharp.CMS.ViewModels.Page
{
    public class PageFooterViewModel
    {
        [MaxLength(200)]
        public string PageFooterName { get; set; }
        [MaxLength]
        public string PageFooterDetails { get; set; }
    }
}