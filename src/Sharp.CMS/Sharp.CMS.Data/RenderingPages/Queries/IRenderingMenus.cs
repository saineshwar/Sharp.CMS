using System.Collections.Generic;
using Sharp.CMS.ViewModels.RenderPage;

namespace Sharp.CMS.Data.RenderingPages.Queries
{
    public interface IRenderingMenus
    {
        List<RenderMainPageDetails> GetParentMenus();

        List<RenderMainPageDetails> GetChildMenus(int parentId);

        List<RenderMainPageDetails> GetSubChildMenus(int childId);

        bool CheckHasFirstChild(int parentId);
        bool CheckHasSubChildMenu(int childId);
    }
}