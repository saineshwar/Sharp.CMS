using System.ComponentModel.DataAnnotations;

namespace Sharp.CMS.ViewModels.Page
{
    public class EditPageFooterViewModel
    {

        public int PageFooterId { get; set; }

        [Display(Name = "Page Footer")]
        [MaxLength(200)]
        [Required(ErrorMessage = "Enter Page Footer")]
        public string PageFooterName { get; set; }

        [Display(Name = "Page Details (English)")]
        [Required(ErrorMessage = "Enter Page Details (English)")]
        public string PageFooterDetailsEN { get; set; }


        [Display(Name = "Page Details (Marathi)")]
        [Required(ErrorMessage = "Enter Page Details (Marathi)")]
        public string PageFooterDetailsLL { get; set; }

        [Required(ErrorMessage = "Status Required")]
        [Display(Name = "Status")]
        public bool Status { get; set; }
    }
}