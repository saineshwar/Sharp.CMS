﻿using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.Page;
using Sharp.CMS.ViewModels.Page;

namespace Sharp.CMS.Data.NewPage.Queries
{
    public class NewPageHeaderQueries : INewPageHeaderQueries
    {
        private readonly SharpContext _sharpContext;
        public NewPageHeaderQueries(SharpContext sharpContext)
        {
            _sharpContext = sharpContext;
        }

        public IQueryable<NewPageHeaderGrid> ShowAllPageHeader(string sortColumn, string sortColumnDir, string search)
        {
            try
            {
                var queryable = (from page in _sharpContext.PageHeaderModel

                                 orderby page.PageHeaderId descending
                                 select new NewPageHeaderGrid()
                                 {
                                     Status = page.Status == true ? "Active" : "InActive",
                                     CreatedOn = page.CreatedOn,
                                     PageHeaderName = page.PageHeaderName,
                                     PageHeaderId = page.PageHeaderId,
                                     IsDefault = page.IsDefault == true ? "Y" : "N",
                                 }
                    );

                if (!(string.IsNullOrEmpty(sortColumn) && string.IsNullOrEmpty(sortColumnDir)))
                {
                    queryable = queryable.OrderBy(sortColumn + " " + sortColumnDir);
                }
                else
                {
                    queryable = queryable.OrderByDescending(x => x.PageHeaderId);
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
                var queryable = (from page in _sharpContext.PageHeaderModel
                                 where page.PageHeaderName == pageheadername
                                 select page).Any();

                return queryable;
            }
            catch (Exception)
            {
                throw;
            }
        }


        public EditPageHeaderViewModel GetPageHeaderbyPageHeaderId(int PageHeaderId)
        {
            try
            {
                var queryable = (from page in _sharpContext.PageHeaderModel
                                 where page.PageHeaderId == PageHeaderId
                                 select new EditPageHeaderViewModel()
                                 {
                                     PageHeaderDetailsEN = page.PageHeaderDetails_EN,
                                     PageHeaderDetailsLL = page.PageHeaderDetails_LL,
                                     PageHeaderId = page.PageHeaderId,
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

        public PageHeaderModel GetPageHeader(int PageHeaderId)
        {
            try
            {
                var queryable = (from page in _sharpContext.PageHeaderModel
                    where page.PageHeaderId == PageHeaderId
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