using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
using Sharp.CMS.ViewModels.Page;

namespace Sharp.CMS.Data.NewPage.Queries
{
    public interface INewPageQueries
    {
        IQueryable<NewPageGrid> ShowAllPages(string sortColumn, string sortColumnDir, string search);
        bool CheckPageNameExists(string pagename);
        EditPageViewModel GetPageDetailsbyPageId(int PageId);
        List<SelectListItem> ListofPages();
    }
}