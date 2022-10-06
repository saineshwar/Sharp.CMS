using System.Linq;
using Sharp.CMS.ViewModels.InnerPage;

namespace Sharp.CMS.Data.InnerPages.Queries
{
    public interface IInnerWidgetsQueries
    {
        IQueryable<InnerPageWidgetGrid> ShowAllPageWidget(string sortColumn, string sortColumnDir, string search);
        bool CheckPageWidgetNameExists(string pageWidgetName);
        InnerEditWidgetsViewModel GetPageWidgetbyPageWidgetId(int pageWidgetId);
    }
}