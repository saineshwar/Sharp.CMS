using System.Linq;
using Sharp.CMS.ViewModels.Page;

namespace Sharp.CMS.Data.NewPage.Queries
{
    public interface INewPageFooterQueries
    {
        IQueryable<NewPageFooterGrid> ShowAllPageFooter(string sortColumn, string sortColumnDir, string search);
        bool CheckPageFooterNameExists(string pageFooterName);
        EditPageFooterViewModel GetPageFooterbyPageFooterId(int pageFooterId);
    }
}