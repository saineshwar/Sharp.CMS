using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Sharp.CMS.ViewModels.Page
{
    public class ContainersViewModel
    {

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
        public string ContainerContentImages{ get; set; }
    }
}