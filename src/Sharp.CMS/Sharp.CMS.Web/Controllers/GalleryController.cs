using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sharp.CMS.Data.MediaAssets.Queries;

namespace Sharp.CMS.Web.Controllers
{
    public class GalleryController : Controller
    {
        private readonly IAlbumQueries _IAlbumQueries;
        public GalleryController(IAlbumQueries albumQueries)
        {
            _IAlbumQueries = albumQueries;
        }

        [HttpGet]
        public IActionResult PhotoAlbums()
        {
            return View(_IAlbumQueries.GetAllActiveAlbum());
        }


        [HttpGet]
        public IActionResult Photos()
        {
            return View();
        }


        [HttpGet]
        public IActionResult VideoAlbums()
        {
            return View();
        }


        [HttpGet]
        public IActionResult Videos()
        {
            return View();
        }


        [HttpGet]
        public IActionResult AudioAlbums()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Audios()
        {
            return View();
        }

    }
}
