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
using Sharp.CMS.Data.MediaAssets.Queries;
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
        private readonly IAlbumQueries _IAlbumQueries;
        private readonly IMediaAssetsQueries _IMediaAssetsQueries;
        public AlbumController(IAlbumCommand albumCommand, IMapper mapper, IAlbumQueries albumQueries, IMediaAssetsQueries mediaAssetsQueries)
        {
            _IAlbumCommand = albumCommand;
            _mapper = mapper;
            _IAlbumQueries = albumQueries;
            _IMediaAssetsQueries = mediaAssetsQueries;
        }
        [HttpGet]
        public IActionResult Create()
        {
            var albumViewModel = new AlbumViewModel()
            {
                ListofMediaType = _IMediaAssetsQueries.ListofMediaTypes()
            };

            return View(albumViewModel);
        }


        [HttpPost]
        public IActionResult Create(AlbumViewModel albumView)
        {

            if (ModelState.IsValid)
            {
                if (_IAlbumQueries.IsAlbumNameExists(albumView.Album))
                {
                    return Json(new { Result = "errorMessage", Message = "Album Name Already Exists" });
                }

                var album = _mapper.Map<AlbumModel>(albumView);
                album.AlbumId = 0;
                album.CreatedOn = DateTime.Now;
                album.CreatedBy = HttpContext.Session.GetInt32(AllSessionKeys.UserId);

                var directoryname = "";
                if (Convert.ToInt32(albumView.MediaTypeId) == (int)MediaType.Audio)
                {
                    album.AlbumImagePath = $"/Album/Audio/{albumView.AlbumName}";
                    directoryname = "Audio";
                }
                else if (Convert.ToInt32(albumView.MediaTypeId) == (int)MediaType.Photo)
                {
                    album.AlbumImagePath = $"/Album/Photo/{albumView.AlbumName}";
                    directoryname = "Photo";
                }
                else if (Convert.ToInt32(albumView.MediaTypeId) == (int)MediaType.Video)
                {
                    album.AlbumImagePath = $"/Album/Video/{albumView.AlbumName}";
                    directoryname = "Video";
                }

                
                album.MediaTypeId = Convert.ToInt32(albumView.MediaTypeId);
                album.Album = albumView.Album;
                var data = _IAlbumCommand.Add(album);

                if (data)
                {

                    var physicalPath = $"{new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")).Root}Album\\{directoryname}\\{albumView.Album}";

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

            albumView.ListofMediaType = _IMediaAssetsQueries.ListofMediaTypes();

            return View(albumView);
        }

        [HttpPost]
        public IActionResult GridAllAlbums()
        {
            try
            {
                var draw = HttpContext.Request.Form["draw"].FirstOrDefault();
                var start = Request.Form["start"].FirstOrDefault();
                var length = Request.Form["length"].FirstOrDefault();
                var sortColumn = Request.Form["columns[" + Request.Form["order[0][column]"].FirstOrDefault() + "][name]"].FirstOrDefault();
                var sortColumnDirection = Request.Form["order[0][dir]"].FirstOrDefault();
                var searchValue = Request.Form["search[value]"].FirstOrDefault();
                int pageSize = length != null ? Convert.ToInt32(length) : 0;
                int skip = start != null ? Convert.ToInt32(start) : 0;
                int recordsTotal = 0;
                var records = _IAlbumQueries.ShowAllAlbums(sortColumn, sortColumnDirection, searchValue);
                recordsTotal = records.Count();
                var data = records.Skip(skip).Take(pageSize).ToList();
                var jsonData = new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = data };
                return Ok(jsonData);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IActionResult GetAlbumbyId(int? albumId)
        {

            if (albumId != null)
            {
                var data = _IAlbumQueries.GetAlbumbyAlbumId(albumId.Value);
                return Json(data);
            }
            else
            {
                return Json(new AlbumModel());
            }
        }


        [HttpPost]
        public IActionResult Edit(AlbumViewModel albumView)
        {

            if (ModelState.IsValid)
            {
                if (albumView.AlbumId != null)
                {
                    var editalbum = _IAlbumQueries.GetAlbum(albumView.AlbumId.Value);
                    if (editalbum == null)
                    {
                        return Json(new { Result = "errorMessage", Message = "Something Went Wrong!" });
                    }

                    if (editalbum.Album != albumView.Album)
                    {
                        if (_IAlbumQueries.IsAlbumNameExists(albumView.Album))
                        {
                            return Json(new { Result = "errorMessage", Message = "Album Name Already Exists" });
                        }
                    }
                    
                    if (albumView.AlbumId == null)
                    {
                        return Json(new { Result = "errorMessage", Message = "Something Went Wrong!" });
                    }

                    
                    var oldalbum = editalbum.Album;

                    editalbum.ModifiedOn = DateTime.Now;
                    editalbum.CreatedBy = HttpContext.Session.GetInt32(AllSessionKeys.UserId);

                    var directoryname = "";
                    if (Convert.ToInt32(albumView.MediaTypeId) == (int)MediaType.Audio)
                    {
                        editalbum.AlbumImagePath = $"/Album/Audio/{albumView.AlbumName}";
                        directoryname = "Audio";
                    }
                    else if (Convert.ToInt32(albumView.MediaTypeId) == (int)MediaType.Photo)
                    {
                        editalbum.AlbumImagePath = $"/Album/Photo/{albumView.AlbumName}";
                        directoryname = "Photo";
                    }
                    else if (Convert.ToInt32(albumView.MediaTypeId) == (int)MediaType.Video)
                    {
                        editalbum.AlbumImagePath = $"/Album/Video/{albumView.AlbumName}";
                        directoryname = "Video";
                    }

                    editalbum.MediaTypeId = Convert.ToInt32(albumView.MediaTypeId);
                    editalbum.AlbumName = albumView.AlbumName;
                    editalbum.Album = albumView.Album;
                    editalbum.AlbumNameLL = albumView.AlbumNameLL;
                    editalbum.IsActive = albumView.IsActive;

                    var data = _IAlbumCommand.Update(editalbum);

                    if (data)
                    {

                        var physicalPath =
                            $"{new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")).Root}Album\\{directoryname}\\{albumView.Album}";

                        if (!Directory.Exists(physicalPath))
                        {
                            var oldphysicalPath =
                                $"{new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")).Root}Album\\{directoryname}\\{oldalbum}";

                            Directory.Move(oldphysicalPath, physicalPath);
                        }

                        return Json(new { Result = "success" });
                    }
                    else
                    {
                        return Json(new { Result = "failed" });
                    }
                }
                else
                {
                    return Json(new { Result = "failed" });
                }
            }
            else
            {
                return Json(new { Result = "failed" });
            }
        }

    }
}
