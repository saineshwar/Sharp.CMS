using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sharp.CMS.Web.Areas.Administration.Controllers
{
    public class MyDashboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
