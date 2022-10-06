using System.Linq;
using Sharp.CMS.ViewModels.InnerPage;

namespace Sharp.CMS.Data.InnerPages.Queries
{
    public interface IInnerNewPageFooterQueries
    {
        IQueryable<InnerNewPageFooterGrid> ShowAllPageFooter(string sortColumn, string sortColumnDir, string search);
        bool CheckPageFooterNameExists(string pageFooterName);
        InnerEditPageFooterViewModel GetPageFooterbyPageFooterId(int pageFooterId);
    }
}