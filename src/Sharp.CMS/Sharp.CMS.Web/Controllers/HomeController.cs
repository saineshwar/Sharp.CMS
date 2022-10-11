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
                var data = _iRenderingPageQueries.ShowHomePage("");
                ViewBag.PageName = data.PageName;
                ViewBag.PageTitle = data.PageTitle_EN;
                return View();
            }
            else
            {
                var data = _iRenderingPageQueries.ShowHomePage(PageName);
                ViewBag.PageName = data.PageName;
                ViewBag.PageTitle = data.PageTitle_EN;
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
