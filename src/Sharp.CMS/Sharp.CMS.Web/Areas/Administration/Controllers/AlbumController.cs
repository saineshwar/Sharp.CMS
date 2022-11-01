using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Sharp.CMS.ViewModels.MediaAssets;
using Sharp.CMS.Web.Filters;

namespace Sharp.CMS.Web.Areas.Administration.Controllers
{
    [Area("Administration")]
    [SessionTimeOut]
    [AuthorizeSuperAdmin]
    public class AlbumController : Controller
    {
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult GetAlbumView(IFormFile filedata)
        {
            return PartialView("_Album");
        }

        [HttpPost]
        public IActionResult Create(AlbumViewModel albumView)
        {
            return PartialView("_Album");
        }
    }
}
