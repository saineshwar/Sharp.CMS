using Sharp.CMS.Models.InnerPage;
using Sharp.CMS.Models.Page;

namespace Sharp.CMS.Data.InnerPages.Command
{
    public interface IInnerWidgetsCommand
    {
        int Add(InnerPageWidgetsModel pageWidgets);
        int Update(InnerPageWidgetsModel pageWidgets);
        bool Deactivate(InnerPageWidgetsModel pageWidgets);
        bool SetDefaultWidget(int? pageWidgetId);
    }
}