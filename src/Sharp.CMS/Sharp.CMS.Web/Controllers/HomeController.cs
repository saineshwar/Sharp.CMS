using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sharp.CMS.Web.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Sharp.CMS.Data.NewPage.Command;
using Sharp.CMS.Data.RenderingPages.Queries;
using Sharp.CMS.ViewModels.RenderPage;

namespace Sharp.CMS.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly IRenderingPageQueries _iRenderingPageQueries;
        private readonly ILogger<HomeController> _logger;
        private readonly INewPageCommand _newPageCommand;
        public HomeController(ILogger<HomeController> logger, IRenderingPageQueries renderingPageQueries, INewPageCommand newPageCommand)
        {
            _logger = logger;
            _iRenderingPageQueries = renderingPageQueries;
            _newPageCommand = newPageCommand;
        }

        public IActionResult Index(string pageName)
        {
            if (string.IsNullOrEmpty(pageName))
            {
                var pageisCahed = _iRenderingPageQueries.GetIsPageCached(pageName);
                RenderMainPageDetails homePagedata;

                if (pageisCahed == false)
                {
                    homePagedata = _iRenderingPageQueries.ShowHomePage("", false);
                    _newPageCommand.UpdateSetNewCache(homePagedata.PageId);
                }
                else
                {
                    homePagedata = _iRenderingPageQueries.ShowHomePage("", true);
                }

                if (homePagedata != null)
                {
                    ViewBag.PageName = homePagedata.PageName;
                    ViewBag.PageTitle = homePagedata.PageTitle_EN;

                    var homePagedetailsdata = _iRenderingPageQueries.ShowPageDetails(homePagedata.PageId);
                    if (homePagedetailsdata != null)
                    {
                        ViewBag.PageDetails_PageHeader_English = homePagedetailsdata.PageHeading_EN;
                        ViewBag.PageDetails_PageHeader_Other = homePagedetailsdata.PageHeading_LL;
                        ViewBag.PageDetails_MetaDescription_EN = homePagedetailsdata.MetaDescription_EN;
                        ViewBag.PageDetails_MetaDescription_LL = homePagedetailsdata.MetaDescription_LL;
                        ViewBag.PageDetails_MetaKeywords_EN = homePagedetailsdata.MetaKeywords_EN;
                        ViewBag.PageDetails_MetaKeywords_LL = homePagedetailsdata.MetaKeywords_LL;
                    }

                    var pageHeaderdetailsdata = _iRenderingPageQueries.ShowPageheaderDetails();
                    if (pageHeaderdetailsdata != null)
                    {
                        ViewBag.PageHeader_PageHeaderName = pageHeaderdetailsdata.PageHeaderName;
                        ViewBag.PageHeader_PageHeaderDetails_EN = pageHeaderdetailsdata.PageHeaderDetails_EN;
                        ViewBag.PageHeader_PageHeaderDetails_LL = pageHeaderdetailsdata.PageHeaderDetails_LL;
                    }

                    var pageFooterdetailsdata = _iRenderingPageQueries.ShowPageFooterDetails();
                    if (pageFooterdetailsdata != null)
                    {
                        ViewBag.PageFooter_PageFooterName = pageFooterdetailsdata.PageFooterName;
                        ViewBag.PageFooter_PageFooterDetails_EN = pageFooterdetailsdata.PageFooterDetails_EN;
                        ViewBag.PageFooter_PageFooterDetails_LL = pageFooterdetailsdata.PageFooterDetails_LL;
                    }

                    var pageContainerdetailsdata = _iRenderingPageQueries.ShowContainersDetails(homePagedata.PageId);
                    if (pageContainerdetailsdata != null)
                    {
                        ViewBag.PageContainer_ContainerName = pageContainerdetailsdata.ContainerName;
                        ViewBag.PageContainer_ContainerDescription_En = pageContainerdetailsdata.ContainerDescription_En;
                        ViewBag.PageContainer_ContainerDescription_Ll = pageContainerdetailsdata.ContainerDescription_Ll;
                    }

                }
                return View();
            }
            else
            {

                if (!_iRenderingPageQueries.IsPageExits(pageName))
                {
                    return RedirectToAction("Index", "PageNotFound");
                }

                if (pageName == "Gallery")
                {
                    return RedirectToAction("Index", "Gallery");
                }

                RenderMainPageDetails renderdata;
                var pageisCahed = _iRenderingPageQueries.GetIsPageCached(pageName);
                if (pageisCahed == false)
                {
                   
                    renderdata = _iRenderingPageQueries.ShowHomePage(pageName, false); 
                    _newPageCommand.UpdateSetNewCache(renderdata.PageId);
                }
                else
                {
                    renderdata = _iRenderingPageQueries.ShowHomePage(pageName, true);
                }

                if (renderdata != null)
                {
                    
                    if (renderdata.IsChildPage || renderdata.IsSubChildPage)
                    {
                        ViewBag.InnerPage = "1";
                    }


                    ViewBag.PageName = renderdata.PageName;
                    ViewBag.PageTitle = renderdata.PageTitle_EN;

                    var homePagedetailsdata = _iRenderingPageQueries.ShowPageDetails(renderdata.PageId);
                    if (homePagedetailsdata != null)
                    {
                        ViewBag.PageDetails_PageHeader_English = homePagedetailsdata.PageHeading_EN;
                        ViewBag.PageDetails_PageHeader_Other = homePagedetailsdata.PageHeading_LL;
                        ViewBag.PageDetails_MetaDescription_EN = homePagedetailsdata.MetaDescription_EN;
                        ViewBag.PageDetails_MetaDescription_LL = homePagedetailsdata.MetaDescription_LL;
                        ViewBag.PageDetails_MetaKeywords_EN = homePagedetailsdata.MetaKeywords_EN;
                        ViewBag.PageDetails_MetaKeywords_LL = homePagedetailsdata.MetaKeywords_LL;
                    }

                    var pageHeaderdetailsdata = _iRenderingPageQueries.ShowPageheaderDetails();
                    if (pageHeaderdetailsdata != null)
                    {
                        ViewBag.PageHeader_PageHeaderName = pageHeaderdetailsdata.PageHeaderName;
                        ViewBag.PageHeader_PageHeaderDetails_EN = pageHeaderdetailsdata.PageHeaderDetails_EN;
                        ViewBag.PageHeader_PageHeaderDetails_LL = pageHeaderdetailsdata.PageHeaderDetails_LL;
                    }

                    var pageFooterdetailsdata = _iRenderingPageQueries.ShowPageFooterDetails();
                    if (pageFooterdetailsdata != null)
                    {
                        ViewBag.PageFooter_PageFooterName = pageFooterdetailsdata.PageFooterName;
                        ViewBag.PageFooter_PageFooterDetails_EN = pageFooterdetailsdata.PageFooterDetails_EN;
                        ViewBag.PageFooter_PageFooterDetails_LL = pageFooterdetailsdata.PageFooterDetails_LL;
                    }

                    var pageContainerdetailsdata = _iRenderingPageQueries.ShowContainersDetails(renderdata.PageId);
                    if (pageContainerdetailsdata != null)
                    {
                        ViewBag.PageContainer_ContainerName = pageContainerdetailsdata.ContainerName;
                        ViewBag.PageContainer_ContainerDescription_En = pageContainerdetailsdata.ContainerDescription_En;
                        ViewBag.PageContainer_ContainerDescription_Ll = pageContainerdetailsdata.ContainerDescription_Ll;
                    }

                }


                return View();
            }
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
