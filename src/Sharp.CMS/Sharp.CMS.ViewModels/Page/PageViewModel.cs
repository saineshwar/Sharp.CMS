using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Sharp.CMS.ViewModels.Page
{
    public class PageViewModel
    {
        [Required(ErrorMessage = "Page Title (English) Required")]
        [Display(Name = "PageTitle (English)")]
        public string PageTitleEn { get; set; }

        [Required(ErrorMessage = "Page Title (Marathi) Required")]
        [Display(Name = "PageTitle (Marathi)")]
        public string PageTitleLl { get; set; }

        [Required(ErrorMessage = "Page Name Required")]
        [Display(Name = "Page Name")]
        public string PageName { get; set; }

        [Display(Name = "OpenInNewTab")]
        public bool OpenInNewTab { get; set; }

        [Display(Name = "IsNew")]
        public bool IsNew { get; set; }

        [Display(Name = "MenuName (Marathi)")]
        public string MenuNameLl { get; set; }

        [Display(Name = "MenuName (English)")]
        public string MenuNameEn { get; set; }

        [Display(Name = "Permalink")]
        public string Permalink { get; set; }

        [Display(Name = "Page Heading (English)")]
        public string PageHeading { get; set; }

        [Display(Name = "Page Heading (Marathi)")]
        public string PageHeadingLl { get; set; }

        [Display(Name = "Meta Description (English)")]
        public string MetaDescriptionEN { get; set; }

        [Display(Name = "Meta Description (Marathi)")]
        public string MetaDescriptionLl { get; set; }

        [Display(Name = "Meta Keywords (English)")]
        public string MetaKeywordsEN { get; set; }

        [Display(Name = "Meta Keywords (Marathi)")]
        public string MetaKeywordsLl { get; set; }

        [Display(Name = "Status")]
        [Required(ErrorMessage = "Required Status")]
        public int StatusId { get; set; }
        public List<SelectListItem> ListofStatus { get; set; }

        [Display(Name = "Container Description (English)")]
        public string ContainerDescriptionEn { get; set; }

        [Display(Name = "Container Description (Marathi)")]
        public string ContainerDescriptionLl { get; set; }
        public int? Status { get; set; }

        [Display(Name = "Content Images")]
        public string ContainerContentImages { get; set; }
        public bool IsActive { get; set; }
    }
}  