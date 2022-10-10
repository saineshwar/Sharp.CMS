using Sharp.CMS.ViewModels.RenderPage;

namespace Sharp.CMS.Data.RenderingPages.Queries
{
    public interface IRenderingPageQueries
    {
        RenderMainPageDetails ShowHomePage(string pagename);
    }
}