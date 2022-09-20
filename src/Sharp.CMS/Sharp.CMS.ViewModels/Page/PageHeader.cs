using System.ComponentModel.DataAnnotations;

namespace Sharp.CMS.ViewModels.Page
{
    public class PageHeaderViewModel
    {
        [Display(Name = "Page Header (English)")]
        [Required(ErrorMessage = "Enter Page Header")]
        public string PageHeaderName { get; set; }


        [Display(Name = "Page Details (English)")]
        [Required(ErrorMessage = "Enter Page Details (English)")]
        [MaxLength]
        public string PageHeaderDetailsEN { get; set; }


        [Display(Name = "Page Details (Marathi)")]
        [Required(ErrorMessage = "Enter Page Details (Marathi)")]
        [MaxLength]
        public string PageHeaderDetailsLL { get; set; }


        [Required(ErrorMessage = "Status Required")]
        [Display(Name = "Status")]
        public bool Status { get; set; }
    }


}