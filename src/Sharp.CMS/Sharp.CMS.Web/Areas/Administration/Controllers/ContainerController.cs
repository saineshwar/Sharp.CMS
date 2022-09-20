using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Rendering;
using Sharp.CMS.Data.NewPage.Queries;
using Sharp.CMS.ViewModels.Page;
using Sharp.CMS.Web.Filters;

namespace Sharp.CMS.Web.Areas.Administration.Controllers
{
    [Area("Administration")]
    [SessionTimeOut]
    public class ContainerController : Controller
    {
        private readonly INewPageQueries _iNewPageQueries;
        public ContainerController(INewPageQueries newPageQueries)
        {
            _iNewPageQueries = newPageQueries;
        }

        [HttpGet]
        public IActionResult Create()
        {
            var pagecontainer = new ContainersViewModel()
            {
                ListofStatus = _iNewPageQueries.ListofPages()
            };
            return View(pagecontainer);
        }


        public IActionResult Index()
        {
            return View();
        }
    }
}
