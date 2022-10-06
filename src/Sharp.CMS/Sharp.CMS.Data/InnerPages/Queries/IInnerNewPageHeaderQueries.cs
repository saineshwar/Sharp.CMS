using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.InnerPage;
using Sharp.CMS.ViewModels.InnerPage;
using Sharp.CMS.ViewModels.Page;

namespace Sharp.CMS.Data.InnerPages.Queries
{
    public interface IInnerNewPageHeaderQueries
    {
        IQueryable<InnerNewPageHeaderGrid> ShowAllPageHeader(string sortColumn, string sortColumnDir, string search);
        bool CheckPageHeaderNameExists(string pageheadername);
        InnerEditPageHeaderViewModel GetPageHeaderbyPageHeaderId(int PageHeaderId);
        InnerPageHeaderModel GetInnerPageHeader(int PageHeaderId);
    }
}