using System.Linq;
using Sharp.CMS.Models.Page;
using Sharp.CMS.ViewModels.Page;

namespace Sharp.CMS.Data.NewPage.Queries
{
    public interface INewPageHeaderQueries
    {
        IQueryable<NewPageHeaderGrid> ShowAllPageHeader(string sortColumn, string sortColumnDir, string search);
        bool CheckPageHeaderNameExists(string pageheadername);
        EditPageHeaderViewModel GetPageHeaderbyPageHeaderId(int PageHeaderId);
        PageHeaderModel GetPageHeader(int PageHeaderId);
    }
}