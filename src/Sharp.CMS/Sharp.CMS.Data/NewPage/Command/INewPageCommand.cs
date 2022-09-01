using Sharp.CMS.Models.Page;

namespace Sharp.CMS.Data.NewPage.Command
{
    public interface INewPageCommand
    {
        int Add(PageModel PageModel);
    }
}