using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sharp.CMS.Web.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Sharp.CMS.Data.RenderingPages.Queries;

namespace Sharp.CMS.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly IRenderingPageQueries _iRenderingPageQueries;
        private readonly ILogger<HomeController> _logger;
        public HomeController(ILogger<HomeController> logger, IRenderingPageQueries renderingPageQueries)
        {
            _logger = logger;
            _iRenderingPageQueries = renderingPageQueries;
        }

        public IActionResult Index(string PageName)
        {
            if (string.IsNullOrEmpty(PageName))
            {
                var homePagedata = _iRenderingPageQueries.ShowHomePage("");
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

                    var PageHeaderdetailsdata = _iRenderingPageQueries.ShowPageheaderDetails();
                    if (PageHeaderdetailsdata != null)
                    {
                        ViewBag.PageHeader_PageHeaderName = PageHeaderdetailsdata.PageHeaderName;
                        ViewBag.PageHeader_PageHeaderDetails_EN = PageHeaderdetailsdata.PageHeaderDetails_EN;
                        ViewBag.PageHeader_PageHeaderDetails_LL = PageHeaderdetailsdata.PageHeaderDetails_LL;
                    }

                    var PageFooterdetailsdata = _iRenderingPageQueries.ShowPageFooterDetails();
                    if (PageFooterdetailsdata != null)
                    {
                        ViewBag.PageFooter_PageFooterName = PageFooterdetailsdata.PageFooterName;
                        ViewBag.PageFooter_PageFooterDetails_EN = PageFooterdetailsdata.PageFooterDetails_EN;
                        ViewBag.PageFooter_PageFooterDetails_LL = PageFooterdetailsdata.PageFooterDetails_LL;
                    }

                    var PageContainerdetailsdata = _iRenderingPageQueries.ShowContainersDetails(homePagedata.PageId);
                    if (PageContainerdetailsdata != null)
                    {
                        ViewBag.PageContainer_ContainerName = PageContainerdetailsdata.ContainerName;
                        ViewBag.PageContainer_ContainerDescription_En = PageContainerdetailsdata.ContainerDescription_En;
                        ViewBag.PageContainer_ContainerDescription_Ll = PageContainerdetailsdata.ContainerDescription_Ll;
                    }

                }
                return View();
            }
            else
            {
                var homePagedata = _iRenderingPageQueries.ShowHomePage(PageName);

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

                    var PageHeaderdetailsdata = _iRenderingPageQueries.ShowPageheaderDetails();
                    if (PageHeaderdetailsdata != null)
                    {
                        ViewBag.PageHeader_PageHeaderName = PageHeaderdetailsdata.PageHeaderName;
                        ViewBag.PageHeader_PageHeaderDetails_EN = PageHeaderdetailsdata.PageHeaderDetails_EN;
                        ViewBag.PageHeader_PageHeaderDetails_LL = PageHeaderdetailsdata.PageHeaderDetails_LL;
                    }

                    var PageFooterdetailsdata = _iRenderingPageQueries.ShowPageFooterDetails();
                    if (PageFooterdetailsdata != null)
                    {
                        ViewBag.PageFooter_PageFooterName = PageFooterdetailsdata.PageFooterName;
                        ViewBag.PageFooter_PageFooterDetails_EN = PageFooterdetailsdata.PageFooterDetails_EN;
                        ViewBag.PageFooter_PageFooterDetails_LL = PageFooterdetailsdata.PageFooterDetails_LL;
                    }

                    var PageContainerdetailsdata = _iRenderingPageQueries.ShowContainersDetails(homePagedata.PageId);
                    if (PageContainerdetailsdata != null)
                    {
                        ViewBag.PageContainer_ContainerName = PageContainerdetailsdata.ContainerName;
                        ViewBag.PageContainer_ContainerDescription_En = PageContainerdetailsdata.ContainerDescription_En;
                        ViewBag.PageContainer_ContainerDescription_Ll = PageContainerdetailsdata.ContainerDescription_Ll;
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
