﻿using System.Security.AccessControl;

namespace Sharp.CMS.ViewModels.RenderPage
{
    public class RenderMainPageDetails
    {
        public int PageId { get; set; }
        public string PageName { get; set; }
        public string MenuNameEN { get; set; }
        public string MenuNameLL { get; set; }
        public string PageTitle_EN { get; set; }
        public string PageTitle_LL { get; set; }
        public string Permalink { get; set; }
        public bool IsPublished { get; set; }
        public bool OpenInNewTab { get; set; }
        public bool IsNew { get; set; }
        public int? ParentPageId { get; set; }
        public int? ChildPageId { get; set; }
        public bool IsCached { get; set; }
        public bool IsChildPage { get; set; }
        public bool IsSubChildPage { get; set; }
        public bool IsHomePage { get; set; }
        public bool IsPhysicalPage { get; set; }
        public string PhysicalPageAction { get; set; }
        public string PhysicalPageController { get; set; }
    }
}