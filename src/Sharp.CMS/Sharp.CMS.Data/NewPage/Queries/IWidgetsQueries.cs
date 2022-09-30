using System.Linq;
using Sharp.CMS.ViewModels.Page;

namespace Sharp.CMS.Data.NewPage.Queries
{
    public interface IWidgetsQueries
    {
        IQueryable<PageWidgetGrid> ShowAllPageWidget(string sortColumn, string sortColumnDir, string search);
        bool CheckPageWidgetNameExists(string pageWidgetName);
        EditWidgetsViewModel GetPageWidgetbyPageWidgetId(int pageWidgetId);
    }
}