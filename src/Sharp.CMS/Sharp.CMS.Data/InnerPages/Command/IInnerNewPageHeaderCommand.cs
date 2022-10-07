using Sharp.CMS.Models.InnerPage;
using Sharp.CMS.Models.Page;

namespace Sharp.CMS.Data.InnerPages.Command
{
    public interface IInnerNewPageHeaderCommand
    {
        int Add(InnerPageHeaderModel PageModel);
        int Update(InnerPageHeaderModel pageHeaderModel);
        bool Deactivate(InnerPageHeaderModel innerPageHeader);
    }
}