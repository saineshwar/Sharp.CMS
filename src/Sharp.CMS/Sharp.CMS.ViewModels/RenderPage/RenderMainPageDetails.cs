namespace Sharp.CMS.ViewModels.RenderPage
{
    public class RenderMainPageDetails
    {
        public string PageName { get; set; }
        public string MenuName_EN { get; set; }
        public string MenuName_LL { get; set; }
        public string PageTitle_EN { get; set; }
        public string PageTitle_LL { get; set; }
        public string Permalink { get; set; }
        public bool IsPublished { get; set; }
        public bool OpenInNewTab { get; set; }
        public bool IsNew { get; set; }
    }
}