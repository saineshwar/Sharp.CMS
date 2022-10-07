using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
using Sharp.CMS.Models.InnerPage;
using Sharp.CMS.ViewModels.InnerPage;
using Sharp.CMS.ViewModels.Page;

namespace Sharp.CMS.Data.InnerPages.Queries
{
    public interface IInnerNewPageQueries
    {
        IQueryable<InnerNewPageGrid> ShowAllPages(string sortColumn, string sortColumnDir, string search);
        bool CheckPageNameExists(string pagename);
        EditInnerPageViewModel GetPageDetailsbyPageId(int PageId);
        List<SelectListItem> ListofPages();
        InnerPageModel GetInnerPage(int? InnerPageId);
    }
}