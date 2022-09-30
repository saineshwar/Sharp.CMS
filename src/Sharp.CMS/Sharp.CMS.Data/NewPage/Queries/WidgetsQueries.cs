using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using Sharp.CMS.Data.Data;
using Sharp.CMS.ViewModels.Page;

namespace Sharp.CMS.Data.NewPage.Queries
{
    public class WidgetsQueries : IWidgetsQueries
    {
        private readonly SharpContext _sharpContext;
        public WidgetsQueries(SharpContext sharpContext)
        {
            _sharpContext = sharpContext;
        }

        public IQueryable<PageWidgetGrid> ShowAllPageWidget(string sortColumn, string sortColumnDir, string search)
        {
            try
            {
                var queryable = (from page in _sharpContext.PageWidgetsModel

                                 orderby page.PageWidgetId descending
                                 select new PageWidgetGrid()
                                 {
                                     Status = page.Status == true ? "Active" : "InActive",
                                     CreatedOn = page.CreatedOn,
                                     PageWidgetName = page.PageWidgetName,
                                     PageWidgetId = page.PageWidgetId
                                 }
                    );

                if (!(string.IsNullOrEmpty(sortColumn) && string.IsNullOrEmpty(sortColumnDir)))
                {
                    queryable = queryable.OrderBy(sortColumn + " " + sortColumnDir);
                }
                else
                {
                    queryable = queryable.OrderByDescending(x => x.PageWidgetId);
                }

                if (!string.IsNullOrEmpty(search))
                {
                    queryable = queryable.Where(m => m.PageWidgetName.Contains(search));
                }

                return queryable;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool CheckPageWidgetNameExists(string pageWidgetName)
        {
            try
            {
                var queryable = (from page in _sharpContext.PageWidgetsModel
                                 where page.PageWidgetName == pageWidgetName
                                 select page).Any();

                return queryable;
            }
            catch (Exception)
            {
                throw;
            }
        }


        public EditWidgetsViewModel GetPageWidgetbyPageWidgetId(int pageWidgetId)
        {
            try
            {
                var queryable = (from page in _sharpContext.PageWidgetsModel
                                 where page.PageWidgetId == pageWidgetId
                                 select new EditWidgetsViewModel()
                                 {
                                     PageWidgetDetailsEN = page.PageWidgetDetails_EN,
                                     PageWidgetDetailsLL = page.PageWidgetDetails_LL,
                                     PageWidgetId = page.PageWidgetId,
                                     PageWidgetName = page.PageWidgetName,
                                     Status = page.Status
                                 }).FirstOrDefault();

                return queryable;
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}