using System.ComponentModel.DataAnnotations;

namespace Sharp.CMS.ViewModels.Page
{
    public class PageFooterViewModel
    {
        [MaxLength(200)]
        [Required(ErrorMessage = "Enter Page Footer")]
        public string PageFooterName { get; set; }

        [Required(ErrorMessage = "Enter Page Details")]
        [MaxLength]
        public string PageFooterDetails { get; set; }

        [Required(ErrorMessage = "Status Required")]
        [Display(Name = "Status")]
        public bool Status { get; set; }
    }
}