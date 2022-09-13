using System.ComponentModel.DataAnnotations;

namespace Sharp.CMS.ViewModels.Page
{
    public class PageHeaderViewModel
    {
        [Required(ErrorMessage = "Enter Page Header")]
        public string PageHeaderName { get; set; }


        [Required(ErrorMessage = "Enter Page Details")]
        [MaxLength]
        public string PageHeaderDetails { get; set; }

        [Required(ErrorMessage = "Status Required")]
        [Display(Name = "Status")]
        public bool Status { get; set; }
    }
}