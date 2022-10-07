using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using Microsoft.AspNetCore.Mvc.Rendering;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.Page;
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
                var queryable = (from page in _sharpContext.PageModel
                                 join pageDetail in _sharpContext.PageDetailsModel on page.PageId equals pageDetail.PageId
                                 join containers in _sharpContext.ContainersModel on page.PageId equals containers.PageId into containersGroup
                                 from containersleft in containersGroup.DefaultIfEmpty()
                                 where page.PageId == PageId
                                 select new EditPageViewModel()
                                 {
                                     PageId = page.PageId,
                                     Permalink = page.Permalink,
                                     PageTitleEn = page.PageTitle_EN,
                                     PageTitleLl = page.PageTitle_LL,
                                     IsNew = page.IsNew,
                                     MenuNameEn = page.MenuName_EN,
                                     MenuNameLl = page.MenuName_LL,
                                     OpenInNewTab = page.OpenInNewTab,
                                     PageName = page.PageName,
                                     MetaDescriptionEN = pageDetail.MetaDescription_EN,
                                     MetaDescriptionLl = pageDetail.MetaDescription_LL,
                                     MetaKeywordsEN = pageDetail.MetaKeywords_EN,
                                     MetaKeywordsLl = pageDetail.MetaKeywords_LL,
                                     PageHeading = pageDetail.PageHeading_EN,
                                     PageHeadingLl = pageDetail.PageHeading_LL,
                                     StatusId = page.Status,
                                     ContainerDescriptionLl = containersleft.ContainerDescription_Ll,
                                     ContainerDescriptionEn = containersleft.ContainerDescription_En,
                                     IsActive = page.IsActive,
                                     ContainersId = containersleft.ContainersId,
                                     PageDetailsId = pageDetail.PageDetailsId,
                                     ParentPageId = page.ParentPageId == null ? string.Empty : Convert.ToString(page.ParentPageId),
                                     IsChildPage = page.IsChildPage,
                                     
                                 }).FirstOrDefault();

                return queryable;
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

        public PageModel GetPagebyPageId(int PageId)
        {
            var queryable = (from page in _sharpContext.PageModel
                             where page.PageId == PageId && page.IsChildPage == false
                             select page
                ).FirstOrDefault();

            return queryable;
        }
    }
}