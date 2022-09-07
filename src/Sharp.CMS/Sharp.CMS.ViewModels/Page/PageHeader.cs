using System.ComponentModel.DataAnnotations;

namespace Sharp.CMS.ViewModels.Page
{
    public class PageHeaderViewModel
    {
        public string PageHeaderName { get; set; }
        [MaxLength]
        public string PageHeaderDetails { get; set; }
    }
}