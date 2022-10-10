using System;

namespace Sharp.CMS.ViewModels.Page
{
    public class NewPageGrid
    {
        public int PageId { get; set; }
        public string MenuName_EN { get; set; }
        public string MenuName_LL { get; set; }
        public string PageTitle_EN { get; set; }
        public string PageTitle_LL { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? CreatedBy { get; set; }
        public bool IsPublished { get; set; }
        public bool OpenInNewTab { get; set; }
        public bool IsNew { get; set; }
        public string PageName { get; set; }
        public string Status { get; set; }
        public string IsChildPage { get; set; }
        public string Active { get; set; }

    }
}