using Sharp.CMS.Models.Page;

namespace Sharp.CMS.Data.NewPage.Command
{
    public interface INewPageHeaderCommand
    {
        int Add(PageHeaderModel PageModel);
        int Update(PageHeaderModel pageHeaderModel);
        bool Deactivate(PageHeaderModel pageHeaderModel);
        bool SetDefaultHeader(int? pageHeaderId);
    }
}