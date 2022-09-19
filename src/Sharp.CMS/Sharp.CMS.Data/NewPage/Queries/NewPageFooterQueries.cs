using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using Sharp.CMS.Data.Data;
using Sharp.CMS.ViewModels.Page;

namespace Sharp.CMS.Data.NewPage.Queries
{
    public class NewPageFooterQueries: INewPageFooterQueries
    {
        private readonly SharpContext _sharpContext;
        public NewPageFooterQueries(SharpContext sharpContext)
        {
            _sharpContext = sharpContext;
        }

        public IQueryable<NewPageFooterGrid> ShowAllPageFooter(string sortColumn, string sortColumnDir, string search)
        {
            try
            {
                var queryable = (from page in _sharpContext.PageFooterModel

                                 orderby page.PageFooterId descending
                                 select new NewPageFooterGrid()
                                 {
                                     Status = page.Status == true ? "Active" : "InActive",
                                     CreatedOn = page.CreatedOn,
                                     PageFooterName = page.PageFooterName,
                                     PageFooterId = page.PageFooterId
                                 }
                    );

                if (!(string.IsNullOrEmpty(sortColumn) && string.IsNullOrEmpty(sortColumnDir)))
                {
                    queryable = queryable.OrderBy(sortColumn + " " + sortColumnDir);
                }
                else
                {
                    queryable = queryable.OrderByDescending(x => x.PageFooterId);
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
                var queryable = (from page in _sharpContext.PageFooterModel
                                 where page.PageFooterName == pageFooterName
                                 select page).Any();

                return queryable;
            }
            catch (Exception)
            {
                throw;
            }
        }


        public EditPageFooterViewModel GetPageFooterbyPageFooterId(int pageFooterId)
        {
            try
            {
                var queryable = (from page in _sharpContext.PageFooterModel
                                 where page.PageFooterId == pageFooterId
                                 select new EditPageFooterViewModel()
                                 {
                                     PageFooterDetails = page.PageFooterDetails,
                                     PageFooterId = page.PageFooterId,
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
    }
}