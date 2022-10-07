using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.InnerPage;
using Sharp.CMS.ViewModels.InnerPage;
using Sharp.CMS.ViewModels.Page;

namespace Sharp.CMS.Data.InnerPages.Queries
{
    public class InnerWidgetsQueries : IInnerWidgetsQueries
    {
        private readonly SharpContext _sharpContext;
        public InnerWidgetsQueries(SharpContext sharpContext)
        {
            _sharpContext = sharpContext;
        }

        public IQueryable<InnerPageWidgetGrid> ShowAllPageWidget(string sortColumn, string sortColumnDir, string search)
        {
            try
            {
                var queryable = (from page in _sharpContext.InnerPageWidgetsModel

                                 orderby page.InnerPageWidgetId descending
                                 select new InnerPageWidgetGrid()
                                 {
                                     Status = page.Status == true ? "Active" : "InActive",
                                     CreatedOn = page.CreatedOn,
                                     PageWidgetName = page.PageWidgetName,
                                     InnerPageWidgetId = page.InnerPageWidgetId
                                 }
                    );

                if (!(string.IsNullOrEmpty(sortColumn) && string.IsNullOrEmpty(sortColumnDir)))
                {
                    queryable = queryable.OrderBy(sortColumn + " " + sortColumnDir);
                }
                else
                {
                    queryable = queryable.OrderByDescending(x => x.InnerPageWidgetId);
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
                var queryable = (from page in _sharpContext.InnerPageWidgetsModel
                                 where page.PageWidgetName == pageWidgetName
                                 select page).Any();

                return queryable;
            }
            catch (Exception)
            {
                throw;
            }
        }


        public InnerEditWidgetsViewModel GetPageWidgetbyPageWidgetId(int pageWidgetId)
        {
            try
            {
                var queryable = (from page in _sharpContext.InnerPageWidgetsModel
                                 where page.InnerPageWidgetId == pageWidgetId
                                 select new InnerEditWidgetsViewModel()
                                 {
                                     PageWidgetDetailsEN = page.PageWidgetDetails_EN,
                                     PageWidgetDetailsLL = page.PageWidgetDetails_LL,
                                     InnerPageWidgetId = page.InnerPageWidgetId,
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

        public InnerPageWidgetsModel GetPageWidget(int InnerPageWidgetId)
        {
            try
            {
                var queryable = (from page in _sharpContext.InnerPageWidgetsModel
                                 where page.InnerPageWidgetId == InnerPageWidgetId
                                 select page).FirstOrDefault();

                return queryable;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}