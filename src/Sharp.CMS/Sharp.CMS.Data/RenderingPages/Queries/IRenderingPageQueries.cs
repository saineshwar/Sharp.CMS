using Sharp.CMS.Models.Page;
using Sharp.CMS.ViewModels.RenderPage;

namespace Sharp.CMS.Data.RenderingPages.Queries
{
    public interface IRenderingPageQueries
    {
        RenderMainPageDetails ShowHomePage(string pagename, bool iscached);
        RenderPageDetails ShowPageDetails(int pageId);

        RenderPageHeaderDetails ShowPageheaderDetails();
        RenderPageFooterDetails ShowPageFooterDetails();
        RenderContainersDetails ShowContainersDetails(int pageId);
        bool GetIsPageCached(string pagename);
        bool IsPageExits(string pagename);
    }
}