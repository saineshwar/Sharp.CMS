using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using Microsoft.AspNetCore.Mvc.Rendering;
using Sharp.CMS.Data.Data;
using Sharp.CMS.ViewModels.MenuMaster;
using Sharp.CMS.ViewModels.Page;

namespace Sharp.CMS.Data.NewPage.Queries
{
    public class NewPageQueries : INewPageQueries
    {
        private readonly SharpContext _sharpContext;
        public NewPageQueries(SharpContext sharpContext)
        {
            _sharpContext = sharpContext;
        }

        public IQueryable<NewPageGrid> ShowAllPages(string sortColumn, string sortColumnDir, string search)
        {
            try
            {
                var queryable = (from page in _sharpContext.PageModel

                                 orderby page.PageId descending
                                 select new NewPageGrid()
                                 {
                                     Status = page.Status == 1 ? "Active" : "InActive",
                                     PageName = page.PageName,
                                     IsNew = page.IsNew,
                                     IsPublished = page.IsPublished,
                                     MenuName_EN = page.MenuName_EN,
                                     MenuName_LL = page.MenuName_LL,
                                     PageId = page.PageId,
                                     PageTitle_EN = page.PageTitle_EN,
                                     PageTitle_LL = page.PageTitle_LL,
                                     OpenInNewTab = page.OpenInNewTab,
                                     CreatedOn = page.CreatedOn

                                 }
                    );

                if (!(string.IsNullOrEmpty(sortColumn) && string.IsNullOrEmpty(sortColumnDir)))
                {
                    queryable = queryable.OrderBy(sortColumn + " " + sortColumnDir);
                }
                else
                {
                    queryable = queryable.OrderByDescending(x => x.PageId);
                }

                if (!string.IsNullOrEmpty(search))
                {
                    queryable = queryable.Where(m => m.PageTitle_EN.Contains(search) || m.MenuName_EN.Contains(search));
                }

                return queryable;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool CheckPageNameExists(string pagename)
        {
            try
            {
                var queryable = (from page in _sharpContext.PageModel
                                 where page.PageName == pagename
                                 select page).Any();

                return queryable;
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}