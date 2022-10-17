using System;

namespace Sharp.CMS.ViewModels.RenderPage
{
    public class RenderMainMenuModel
    {
        public int PageId { get; set; }
        public string MenuNameEN { get; set; }
        public string MenuNameLL { get; set; }
        public int? ParentPageId { get; set; }
        public int? ChildPageId { get; set; }
        public bool IsChildPage { get; set; }
        public bool IsSubChildPage { get; set; }
    }

    public class RenderFirstSubMainMenuModel
    {
        public int PageId { get; set; }
        public string MenuNameEN { get; set; }
        public string MenuNameLL { get; set; }
        public int? ParentPageId { get; set; }
        public int? ChildPageId { get; set; }
        public bool IsChildPage { get; set; }
        public bool IsSubChildPage { get; set; }
    }

    public class RenderSecondSubMainMenuModel
    {
        public int PageId { get; set; }
        public string MenuNameEN { get; set; }
        public string MenuNameLL { get; set; }
        public int? ParentPageId { get; set; }
        public int? ChildPageId { get; set; }
        public bool IsChildPage { get; set; }
        public bool IsSubChildPage { get; set; }
    }
}