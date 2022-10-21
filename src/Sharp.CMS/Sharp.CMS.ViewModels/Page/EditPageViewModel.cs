using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.Rendering;
using Sharp.CMS.ViewModels.Attachments;

namespace Sharp.CMS.ViewModels.Page
{
    public class EditPageViewModel
    {
        public int PageId { get; set; }

        [Required(ErrorMessage = "Page Title English Required")]
        [Display(Name = "PageTitle English")]
        public string PageTitleEn { get; set; }

        [Required(ErrorMessage = "Page Title Local Language Required")]
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
        [Required(ErrorMessage = "MenuName (Marathi) Required")]
        public string MenuNameLl { get; set; }

        [Display(Name = "MenuName (English)")]
        [Required(ErrorMessage = "MenuName (English) Required")]
        public string MenuNameEn { get; set; }

        [Display(Name = "Permalink")]
        public string Permalink { get; set; }

        [Display(Name = "Page Heading (English)")]
        [Required(ErrorMessage = "Page Heading (English) Required")]
        public string PageHeading { get; set; }

        [Display(Name = "Page Heading (Marathi)")]
        [Required(ErrorMessage = "Page Heading (Marathi) Required")]
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
        public int? StatusId { get; set; }
        public List<SelectListItem> ListofStatus { get; set; }

        [Display(Name = "Container Description (English)")]
        public string ContainerDescriptionEn { get; set; }

        [Display(Name = "Container Description (Marathi)")]
        public string ContainerDescriptionLl { get; set; }

        [Display(Name = "Content Images")]
        public string ContainerContentImages { get; set; }

        public bool IsActive { get; set; }

        public int ContainersId { get; set; }
        public int PageDetailsId { get; set; }

        public List<DisplayAttachmentsViewModel> ListofAttachments { get; set; }

        [Display(Name = "Parent Page")]
        public string ParentPageName { get; set; }
        public string HiddenParentPageId { get; set; }
        public bool IsChildPage { get; set; }

        [Display(Name = "Child Page")]
        public string ChildPageName { get; set; }
        public string HiddenChildPageId { get; set; }

        public bool IsHomePage { get; set; }
        public bool IsSubChildPage { get; set; }
    }
}