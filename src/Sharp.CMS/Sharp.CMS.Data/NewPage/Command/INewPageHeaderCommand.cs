using Sharp.CMS.Models.Page;

namespace Sharp.CMS.Data.NewPage.Command
{
    public interface INewPageHeaderCommand
    {
        int Add(PageHeaderModel PageModel);
        int Update(PageHeaderModel pageHeaderModel);
    }
}