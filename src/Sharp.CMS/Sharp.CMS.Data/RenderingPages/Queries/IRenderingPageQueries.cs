using Sharp.CMS.ViewModels.RenderPage;

namespace Sharp.CMS.Data.RenderingPages.Queries
{
    public interface IRenderingPageQueries
    {
        RenderMainPageDetails ShowHomePage(string pagename);
        RenderPageDetails ShowPageDetails(int pageId);

        RenderPageHeaderDetails ShowPageheaderDetails();
        RenderPageFooterDetails ShowPageFooterDetails();
        RenderContainersDetails ShowContainersDetails(int pageId);
    }
}