using System.Linq;
using Sharp.CMS.ViewModels.Page;

namespace Sharp.CMS.Data.NewPage.Queries
{
    public interface INewPageQueries
    {
        IQueryable<NewPageGrid> ShowAllPages(string sortColumn, string sortColumnDir, string search);
        bool CheckPageNameExists(string pagename);
    }
}