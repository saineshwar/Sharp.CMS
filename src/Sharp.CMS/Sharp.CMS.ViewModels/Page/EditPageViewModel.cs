using System.ComponentModel.DataAnnotations;

namespace Sharp.CMS.ViewModels.Page
{
    public class EditPageViewModel
    {
        public int PageId { get; set; }

        [Required(ErrorMessage = "Page Title English Required")]
        [Display(Name = "PageTitle English")]
        public string PageTitleEn { get; set; }

        [Required(ErrorMessage = "Page Title Local Language Required")]
        [Display(Name = "PageTitle Other")]
        public string PageTitleLl { get; set; }

        [Required(ErrorMessage = "Page Name Required")]
        [Display(Name = "Page Name")]
        public string PageName { get; set; }

        [Display(Name = "Status")]
        public int? Status { get; set; }

        [Display(Name = "OpenInNewTab")]
        public bool OpenInNewTab { get; set; }

        [Display(Name = "IsNew")]
        public bool IsNew { get; set; }

        [Display(Name = "MenuName Local Language")]
        public string MenuNameLl { get; set; }

        [Display(Name = "MenuName English")]
        public string MenuNameEn { get; set; }

        [Display(Name = "Permalink")]
        public string Permalink { get; set; }

        [Display(Name = "Page Heading English")]
        public string PageHeading { get; set; }

        [Display(Name = "Page Heading Local Language")]
        public string PageHeadingLl { get; set; }

        [Display(Name = "Meta Description English")]
        public string MetaDescriptionEN { get; set; }

        [Display(Name = "Meta Description Local Language")]
        public string MetaDescriptionLl { get; set; }

        [Display(Name = "Meta Keywords English")]
        public string MetaKeywordsEN { get; set; }

        [Display(Name = "Meta Keywords Local Language")]
        public string MetaKeywordsLl { get; set; }
    }
}