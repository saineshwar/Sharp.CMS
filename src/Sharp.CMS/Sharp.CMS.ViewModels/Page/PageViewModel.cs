using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Sharp.CMS.ViewModels.Page
{
    public class PageViewModel
    {
        [Display(Name = "PageTitle English")]
        public string PageTitleEn { get; set; }

        [Display(Name = "PageTitle LL")]
        public string PageTitleLl { get; set; }

        [Display(Name = "Status")]
        public bool Status { get; set; }

        [Display(Name = "IsParent")]
        public bool IsParent { get; set; }

        [Display(Name = "OpenInNewTab")]
        public bool OpenInNewTab { get; set; }

        [Display(Name = "IsNew")]
        public bool IsNew { get; set; }

        [Display(Name = "MenuName")]
        public string MenuNameLl { get; set; }

        [Display(Name = "MenuName")]
        public string MenuNameEn { get; set; }

        [Display(Name = "Permalink")]
        public string Permalink { get; set; }

    }
}  