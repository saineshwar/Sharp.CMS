using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;
using Sharp.CMS.Common;
using Sharp.CMS.Data.MediaAssets.Command;
using Sharp.CMS.Models.Medias;
using Sharp.CMS.Models.UserMaster;
using Sharp.CMS.ViewModels.MediaAssets;
using Sharp.CMS.Web.Filters;

namespace Sharp.CMS.Web.Areas.Administration.Controllers
{
    [Area("Administration")]
    [SessionTimeOut]
    [AuthorizeSuperAdmin]
    public class AlbumController : Controller
    {
        private readonly IAlbumCommand _IAlbumCommand;
        private readonly IMapper _mapper;
        public AlbumController(IAlbumCommand albumCommand, IMapper mapper)
        {
            _IAlbumCommand = albumCommand;
            _mapper = mapper;
        }
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

            if (ModelState.IsValid)
            {
                var album = _mapper.Map<AlbumModel>(albumView);
                album.AlbumId = 0;
                album.CreatedOn = DateTime.Now;
                album.CreatedBy = HttpContext.Session.GetInt32(AllSessionKeys.UserId);
                var data = _IAlbumCommand.Add(album);

                if (data)
                {

                    var physicalPath = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")).Root;

                    if (!Directory.Exists(physicalPath))
                    {
                        Directory.CreateDirectory(physicalPath);
                    }

                    return Json(new { Result = "success" });
                }
                else
                {
                    return Json(new { Result = "failed" });
                }
            }



            return View();
        }
    }
}
