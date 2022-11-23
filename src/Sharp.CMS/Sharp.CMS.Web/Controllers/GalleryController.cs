using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sharp.CMS.Data.MediaAssets.Queries;
using Sharp.CMS.ViewModels.Album;
using X.PagedList;

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
        public IActionResult Index()
        {
            return View(_IAlbumQueries.GetAllActiveAlbum());
        }


        [HttpGet]
        public IActionResult Photos(string album, int? page = 1)
        {
            if (!string.IsNullOrEmpty(album))
            {
                if (!_IAlbumQueries.IsAlbumNameExists(album))
                {
                    return RedirectToAction("Index", "Gallery");
                }
            }

            if (page < 0)
            {
                page = 1;
            }

            var albumId = _IAlbumQueries.GetAlbumIdbyAlbumName(album);

            var photoListView = new PhotoListViewModel();
            var pageIndex = (page ?? 1) - 1;
            var pageSize = 5;
            var photolist = _IAlbumQueries.GetAllAlbumPhotos(pageIndex, pageSize, albumId);
            var photolistcount = _IAlbumQueries.GetAllAlbumPhotosCount(pageIndex, pageSize, albumId);

            var photolistPagedList = new StaticPagedList<PhotoListGrid>(photolist, pageIndex + 1, pageSize, photolistcount);
            photoListView.PhotoListGrid = photolistPagedList;
            photoListView.Album = album;
            return View(photoListView);
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
