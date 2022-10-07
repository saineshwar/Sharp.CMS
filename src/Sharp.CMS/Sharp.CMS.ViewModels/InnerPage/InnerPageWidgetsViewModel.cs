using System.ComponentModel.DataAnnotations;

namespace Sharp.CMS.ViewModels.InnerPage
{
    public class InnerPageWidgetsViewModel
    {
        [Display(Name = "Page Inner Widget Name")]
        [MaxLength(200)]
        [Required(ErrorMessage = "Enter Inner Widget Name")]
        public string PageWidgetName { get; set; }

        [Display(Name = "Page Widget Details (English)")]
        [Required(ErrorMessage = "Enter Page Details (English)")]
        [MaxLength]
        public string PageWidgetDetailsEN { get; set; }

        [Display(Name = "Page Widget Details (Marathi)")]
        [Required(ErrorMessage = "Enter Page Details (Marathi)")]
        [MaxLength]
        public string PageWidgetDetailsLL { get; set; }

        [Required(ErrorMessage = "Status Required")]
        [Display(Name = "Status")]
        public bool Status { get; set; }
    }
}