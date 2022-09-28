using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.Rendering;
using Sharp.CMS.ViewModels.Attachments;

namespace Sharp.CMS.ViewModels.Page
{
    public class EditContainersViewModel
    {
        public int ContainersId { get; set; }

        [Display(Name = "Page Name")]
        [Required(ErrorMessage = "Select Page Header")]
        public string PageId { get; set; }
        public List<SelectListItem> ListofStatus { get; set; }

        [MaxLength(50)]
        [Display(Name = "Container Name")]
        [Required(ErrorMessage = "Enter Container Name")]
        public string ContainerName { get; set; }

        [Display(Name = "Container Description (English)")]
        public string ContainerDescriptionEn { get; set; }

        [Display(Name = "Container Description (Marathi)")]
        public string ContainerDescriptionLl { get; set; }

        [Display(Name = "Status")]
        public bool Status { get; set; }

        [Display(Name = "Content Images")]
        public string ContainerContentImages { get; set; }

        public List<DisplayAttachmentsViewModel> ListofAttachments { get; set; }
    }
}