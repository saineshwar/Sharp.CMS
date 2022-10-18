using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Dynamic.Core;
using Dapper;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualBasic;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.Page;
using Sharp.CMS.ViewModels.MenuMaster;
using Sharp.CMS.ViewModels.Page;

namespace Sharp.CMS.Data.NewPage.Queries
{
    public class NewPageQueries : INewPageQueries
    {
        private readonly SharpContext _sharpContext;
        private readonly IConfiguration _configuration;
        public NewPageQueries(SharpContext sharpContext, IConfiguration configuration)
        {
            _sharpContext = sharpContext;
            _configuration = configuration;
        }

        public IQueryable<NewPageGrid> ShowAllPages(string sortColumn, string sortColumnDir, string search)
        {
            try
            {
                var queryable = (from page in _sharpContext.PageModel

                                 orderby page.PageId descending
                                 select new NewPageGrid()
                                 {
                                     Status = page.Status == 1 ? "Draft" : "Published",
                                     PageName = page.PageName,
                                     IsNew = page.IsNew,
                                     IsPublished = page.IsPublished,
                                     MenuName_EN = page.MenuName_EN,
                                     MenuName_LL = page.MenuName_LL,
                                     PageId = page.PageId,
                                     PageTitle_EN = page.PageTitle_EN,
                                     PageTitle_LL = page.PageTitle_LL,
                                     OpenInNewTab = page.OpenInNewTab,
                                     CreatedOn = page.CreatedOn,
                                     IsChildPage = page.IsChildPage == true ? "Child" : "Parent",
                                     Active = page.IsActive == true ? "Active" : "InActive",
                                     IsHomePage = page.IsHomePage == true ? "Y" : "N",
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

        public bool CheckPageNameExists(string pagename, int? pageid)
        {
            try
            {
                bool queryable;
                if (pageid == null)
                {
                    queryable = (from page in _sharpContext.PageModel
                                 where page.PageName == pagename
                                 select page).Any();
                }
                else
                {

                    queryable = (from page in _sharpContext.PageModel
                                 where page.PageName == pagename && page.PageId == pageid
                                 select page).Any();
                }

                return queryable;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public EditPageViewModel GetPageDetailsbyPageId(int PageId)
        {
            try
            {
                using SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection"));
                var param = new DynamicParameters();
                param.Add("@PageId", PageId);
                return con.Query<EditPageViewModel>("Usp_GetPageDetails", param, null, false, 0,
                    CommandType.StoredProcedure).FirstOrDefault();

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<SelectListItem> ListofPages()
        {
            try
            {
                var queryable = (from page in _sharpContext.PageModel

                                 select new SelectListItem
                                 {
                                     Value = page.PageId.ToString(),
                                     Text = page.PageName
                                 }).ToList();

                queryable.Insert(0, new SelectListItem()
                {
                    Value = "",
                    Text = "-----Select-----"
                });
                return queryable;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<SelectListItem> ListofChildPage(int parentId)
        {
            try
            {
                var queryable = (from page in _sharpContext.PageModel
                                 where page.IsChildPage == true && page.ParentPageId == parentId
                                 select new SelectListItem
                                 {
                                     Value = page.PageId.ToString(),
                                     Text = page.PageName
                                 }).ToList();

                queryable.Insert(0, new SelectListItem()
                {
                    Value = "",
                    Text = "-----Select-----"
                });
                return queryable;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public PageModel GetPagebyPageId(int PageId)
        {
            var queryable = (from page in _sharpContext.PageModel
                             where page.PageId == PageId && page.IsChildPage == false
                             select page
                ).FirstOrDefault();

            return queryable;
        }

        public List<SelectListItem> ListofChildPage()
        {
            throw new NotImplementedException();
        }

        public List<SelectListItem> GetAutoCompleteParentPage(string parentpage)
        {
            try
            {
                using SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection"));
                var param = new DynamicParameters();
                param.Add("@ParentPageName", parentpage);
                return con.Query<SelectListItem>("Usp_GetParentPageName", param, null, false, 0,
                    CommandType.StoredProcedure).ToList();

            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<SelectListItem> GetAutoCompleteChildPage(string childPageName, string parentpageId)
        {
            try
            {
                using SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection"));
                var param = new DynamicParameters();
                param.Add("@ChildPageName", childPageName);
                param.Add("@ParentPageId", parentpageId);
                return con.Query<SelectListItem>("Usp_GetChildPageName", param, null, false, 0,
                    CommandType.StoredProcedure).ToList();

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}