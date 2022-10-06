using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.InnerPage;
using Sharp.CMS.ViewModels.InnerPage;
using Sharp.CMS.ViewModels.Page;

namespace Sharp.CMS.Data.InnerPages.Queries
{
    public class InnerNewPageHeaderQueries : IInnerNewPageHeaderQueries
    {
        private readonly SharpContext _sharpContext;
        public InnerNewPageHeaderQueries(SharpContext sharpContext)
        {
            _sharpContext = sharpContext;
        }

        public IQueryable<InnerNewPageHeaderGrid> ShowAllPageHeader(string sortColumn, string sortColumnDir, string search)
        {
            try
            {
                var queryable = (from page in _sharpContext.InnerPageHeaderModel

                                 orderby page.InnerPageHeaderId descending
                                 select new InnerNewPageHeaderGrid()
                                 {
                                     Status = page.Status == true ? "Active" : "InActive",
                                     CreatedOn = page.CreatedOn,
                                     PageHeaderName = page.PageHeaderName,
                                     InnerPageHeaderId = page.InnerPageHeaderId
                                 }
                    );

                if (!(string.IsNullOrEmpty(sortColumn) && string.IsNullOrEmpty(sortColumnDir)))
                {
                    queryable = queryable.OrderBy(sortColumn + " " + sortColumnDir);
                }
                else
                {
                    queryable = queryable.OrderByDescending(x => x.InnerPageHeaderId);
                }

                if (!string.IsNullOrEmpty(search))
                {
                    queryable = queryable.Where(m => m.PageHeaderName.Contains(search));
                }

                return queryable;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool CheckPageHeaderNameExists(string pageheadername)
        {
            try
            {
                var queryable = (from page in _sharpContext.InnerPageHeaderModel
                                 where page.PageHeaderName == pageheadername
                                 select page).Any();

                return queryable;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public InnerEditPageHeaderViewModel GetPageHeaderbyPageHeaderId(int PageHeaderId)
        {
            try
            {
                var queryable = (from page in _sharpContext.InnerPageHeaderModel
                                 where page.InnerPageHeaderId == PageHeaderId
                                 select new InnerEditPageHeaderViewModel()
                                 {
                                     PageHeaderDetailsEN = page.PageHeaderDetails_EN,
                                     PageHeaderDetailsLL = page.PageHeaderDetails_LL,
                                     InnerPageHeaderId = page.InnerPageHeaderId,
                                     PageHeaderName = page.PageHeaderName,
                                     Status = page.Status
                                 }).FirstOrDefault();

                return queryable;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public InnerPageHeaderModel GetInnerPageHeader(int PageHeaderId)
        {
            try
            {
                var queryable = (from pageheader in _sharpContext.InnerPageHeaderModel
                                 where pageheader.InnerPageHeaderId == PageHeaderId
                                 select pageheader).FirstOrDefault();

                return queryable;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}