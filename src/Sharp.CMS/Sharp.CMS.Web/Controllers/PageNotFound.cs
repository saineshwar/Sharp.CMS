using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sharp.CMS.Web.Controllers
{
    public class PageNotFound : Controller
    {
        public IActionResult Index()
        {
            return View("PageNotFound");
        }
    }
}
