using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.InnerPage;
using Sharp.CMS.ViewModels.InnerPage;
using Sharp.CMS.ViewModels.Page;

namespace Sharp.CMS.Data.InnerPages.Queries
{
    public class InnerNewPageFooterQueries : IInnerNewPageFooterQueries
    {
        private readonly SharpContext _sharpContext;
        public InnerNewPageFooterQueries(SharpContext sharpContext)
        {
            _sharpContext = sharpContext;
        }

        public IQueryable<InnerNewPageFooterGrid> ShowAllPageFooter(string sortColumn, string sortColumnDir, string search)
        {
            try
            {
                var queryable = (from page in _sharpContext.InnerPageFooterModel

                                 orderby page.InnerPageFooterId descending
                                 select new InnerNewPageFooterGrid()
                                 {
                                     Status = page.Status == true ? "Active" : "InActive",
                                     CreatedOn = page.CreatedOn,
                                     PageFooterName = page.PageFooterName,
                                     InnerPageFooterId = page.InnerPageFooterId,
                                     IsDefault = page.IsDefault == true ? "Y" : "N",
                                 }
                    );

                if (!(string.IsNullOrEmpty(sortColumn) && string.IsNullOrEmpty(sortColumnDir)))
                {
                    queryable = queryable.OrderBy(sortColumn + " " + sortColumnDir);
                }
                else
                {
                    queryable = queryable.OrderByDescending(x => x.InnerPageFooterId);
                }

                if (!string.IsNullOrEmpty(search))
                {
                    queryable = queryable.Where(m => m.PageFooterName.Contains(search));
                }

                return queryable;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool CheckPageFooterNameExists(string pageFooterName)
        {
            try
            {
                var queryable = (from page in _sharpContext.InnerPageFooterModel
                                 where page.PageFooterName == pageFooterName
                                 select page).Any();

                return queryable;
            }
            catch (Exception)
            {
                throw;
            }
        }


        public InnerEditPageFooterViewModel GetPageFooterbyPageFooterId(int pageFooterId)
        {
            try
            {
                var queryable = (from page in _sharpContext.InnerPageFooterModel
                                 where page.InnerPageFooterId == pageFooterId
                                 select new InnerEditPageFooterViewModel()
                                 {
                                     PageFooterDetailsEN = page.PageFooterDetails_EN,
                                     PageFooterDetailsLL = page.PageFooterDetails_LL,
                                     InnerPageFooterId = page.InnerPageFooterId,
                                     PageFooterName = page.PageFooterName,
                                     Status = page.Status
                                 }).FirstOrDefault();

                return queryable;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public InnerPageFooterModel GetInnerPageFooterbyPageFooterId(int innerPageFooterId)
        {
            try
            {
                var queryable = (from page in _sharpContext.InnerPageFooterModel
                    where page.InnerPageFooterId == innerPageFooterId
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