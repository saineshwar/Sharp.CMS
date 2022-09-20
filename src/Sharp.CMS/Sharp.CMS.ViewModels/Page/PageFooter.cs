using System.ComponentModel.DataAnnotations;

namespace Sharp.CMS.ViewModels.Page
{
    public class PageFooterViewModel
    {
        [Display(Name = "Page Footer")]
        [MaxLength(200)]
        [Required(ErrorMessage = "Enter Page Footer")]
        public string PageFooterName { get; set; }

        [Display(Name = "Page Details (English)")]
        [Required(ErrorMessage = "Enter Page Details (English)")]
        [MaxLength]
        public string PageFooterDetailsEN { get; set; }

        [Display(Name = "Page Details (Marathi)")]
        [Required(ErrorMessage = "Enter Page Details (Marathi)")]
        [MaxLength]
        public string PageFooterDetailsLL { get; set; }


        [Required(ErrorMessage = "Status Required")]
        [Display(Name = "Status")]
        public bool Status { get; set; }
    }
}