using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sharp.CMS.Web.Filters;

namespace Sharp.CMS.Web.Areas.Administration.Controllers
{
    [Area("Administration")]
    [SessionTimeOut]
    [AuthorizeSuperAdmin]
    public class MediaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
