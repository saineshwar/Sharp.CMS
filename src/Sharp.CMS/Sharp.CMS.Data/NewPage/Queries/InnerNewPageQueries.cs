using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using Microsoft.AspNetCore.Mvc.Rendering;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.InnerPage;
using Sharp.CMS.ViewModels.InnerPage;
using Sharp.CMS.ViewModels.Page;

namespace Sharp.CMS.Data.NewPage.Queries
{
    public class InnerNewPageQueries : IInnerNewPageQueries
    {
        private readonly SharpContext _sharpContext;
        public InnerNewPageQueries(SharpContext sharpContext)
        {
            _sharpContext = sharpContext;
        }

        public IQueryable<InnerNewPageGrid> ShowAllPages(string sortColumn, string sortColumnDir, string search)
        {
            try
            {
                var queryable = (from page in _sharpContext.InnerPageModel

                                 orderby page.InnerPageId descending
                                 select new InnerNewPageGrid()
                                 {
                                     Status = page.IsActive == true ? "Active" : "InActive",
                                     PageName = page.PageName,
                                     IsNew = page.IsNew,
                                     IsPublished = page.IsPublished,
                                     MenuName_EN = page.MenuName_EN,
                                     MenuName_LL = page.MenuName_LL,
                                     InnerPageId = page.InnerPageId,
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
                    queryable = queryable.OrderByDescending(x => x.InnerPageId);
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
                var queryable = (from page in _sharpContext.InnerPageModel
                                 where page.PageName == pagename
                                 select page).Any();

                return queryable;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public EditInnerPageViewModel GetPageDetailsbyPageId(int PageId)
        {
            try
            {
                var queryable = (from page in _sharpContext.InnerPageModel
                                 join pageDetail in _sharpContext.InnerPageDetailsModel on page.InnerPageId equals pageDetail.InnerPageId
                                 join containers in _sharpContext.ContainersModel on page.InnerPageId equals containers.PageId into containersGroup
                                 from containersleft in containersGroup.DefaultIfEmpty()
                                 where page.InnerPageId == PageId
                                 select new EditInnerPageViewModel()
                                 {
                                     InnerPageId = page.InnerPageId,
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
                                     PageDetailsId = pageDetail.InnerPageDetailsId,
                                     PageId = page.PageId.ToString()

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
                var queryable = (from page in _sharpContext.InnerPageModel

                                 select new SelectListItem
                                 {
                                     Value = page.InnerPageId.ToString(),
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

        public InnerPageModel GetInnerPage(int? InnerPageId)
        {
            try
            {
                var queryable = (from page in _sharpContext.InnerPageModel
                                 where page.InnerPageId == InnerPageId
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