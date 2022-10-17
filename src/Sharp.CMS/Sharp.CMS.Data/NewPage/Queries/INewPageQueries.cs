using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
using Sharp.CMS.Models.Page;
using Sharp.CMS.ViewModels.Page;

namespace Sharp.CMS.Data.NewPage.Queries
{
    public interface INewPageQueries
    {
        IQueryable<NewPageGrid> ShowAllPages(string sortColumn, string sortColumnDir, string search);
        bool CheckPageNameExists(string pagename, int? pageid);
        EditPageViewModel GetPageDetailsbyPageId(int PageId);
        List<SelectListItem> ListofPages();
        PageModel GetPagebyPageId(int PageId);
        List<SelectListItem> ListofChildPage();
        List<SelectListItem> ListofChildPage(int parentId);
        List<SelectListItem> GetAutoCompleteParentPage(string parentpage);
        List<SelectListItem> GetAutoCompleteChildPage(string childPageName, string parentpageId);
    }
}