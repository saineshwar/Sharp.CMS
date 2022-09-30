using Sharp.CMS.Models.Page;

namespace Sharp.CMS.Data.NewPage.Command
{
    public interface IWidgetsCommand
    {
        int Add(PageWidgetsModel pageWidgets);
        int Update(PageWidgetsModel pageWidgets);
        bool Delete(PageWidgetsModel pageWidgets);
    }
}