using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using Sharp.CMS.Common;
using Sharp.CMS.Data.MediaAssets.Command;
using Sharp.CMS.Data.MediaAssets.Queries;
using Sharp.CMS.Models.Medias;
using Sharp.CMS.ViewModels.MediaAssets;
using Sharp.CMS.Web.Filters;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.StaticFiles;
using Sharp.CMS.Data.Albums.Command;
using Sharp.CMS.Models.Albums;

namespace Sharp.CMS.Web.Areas.Administration.Controllers
{
    [Area("Administration")]
    [SessionTimeOut]
    [AuthorizeSuperAdmin]
    public class MediaAssetsController : Controller
    {
        private readonly IMediaHistoryCommand _iMediaHistoryCommand;
        private readonly IMediaAssetsQueries _iMediaAssetsQueries;
        private readonly IAlbumQueries _iAlbumQueries;
        private readonly IAlbumUploadCommand _albumUploadCommand;
        public MediaAssetsController(
            IMediaHistoryCommand mediaHistoryCommand,
            IMediaAssetsQueries mediaAssetsQueries,
            IAlbumQueries albumQueries, IAlbumUploadCommand albumCommand)
        {
            _iMediaHistoryCommand = mediaHistoryCommand;
            _iMediaAssetsQueries = mediaAssetsQueries;
            _iAlbumQueries = albumQueries;
            _albumUploadCommand = albumCommand;
        }

        [HttpGet]
        public IActionResult UploadMedia()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> UploadMedia(IFormFile filedata)
        {
            var files = HttpContext.Request.Form.Files;
            if (files.Any())
            {
                foreach (var file in files)
                {
                    if (file.Length > 0)
                    {
                        //Getting FileName
                        var fileName = Path.GetFileName(file.FileName);

                        //Getting file Extension
                        var fileExtension = Path.GetExtension(fileName);

                        await using var target = new MemoryStream();
                        await file.CopyToAsync(target);
                        var physicalPath =
                            new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Media",
                                "Content")).Root + $@"{fileName}";
                        string filePath = "/Media/Content/" + fileName;
                        await using FileStream fs = System.IO.File.Create(physicalPath);
                        await file.CopyToAsync(fs);
                        fs.Flush();

                        var MediaHistoryModel = new MediaHistoryModel()
                        {
                            FileName = fileName,
                            CreatedOn = DateTime.Now,
                            MediaHistoryId = 0,
                            FilePath = filePath,
                            CreatedBy = HttpContext.Session.GetInt32(AllSessionKeys.UserId)
                        };

                        _iMediaHistoryCommand.Add(MediaHistoryModel);
                    }
                }
            }

            TempData["MessageSuccess"] = "Files Uploaded Successfully!";

            return View();
        }

        [HttpPost]
        public IActionResult GridAllUploadedMedia()
        {
            try
            {
                var draw = HttpContext.Request.Form["draw"].FirstOrDefault();
                var start = Request.Form["start"].FirstOrDefault();
                var length = Request.Form["length"].FirstOrDefault();
                var sortColumn = Request
                    .Form["columns[" + Request.Form["order[0][column]"].FirstOrDefault() + "][name]"].FirstOrDefault();
                var sortColumnDirection = Request.Form["order[0][dir]"].FirstOrDefault();
                var searchValue = Request.Form["search[value]"].FirstOrDefault();
                int pageSize = length != null ? Convert.ToInt32(length) : 0;
                int skip = start != null ? Convert.ToInt32(start) : 0;
                int recordsTotal = 0;
                var rolesdata =
                    _iMediaAssetsQueries.ShowAllUploadedPhotos(sortColumn, sortColumnDirection, searchValue);
                recordsTotal = rolesdata.Count();
                var data = rolesdata.Skip(skip).Take(pageSize).ToList();
                var jsonData = new
                { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = data };
                return Ok(jsonData);
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpGet]
        public IActionResult AlbumUpload()
        {
            var data = new UploadMediaViewModel()
            {
                ListofAlbum = _iAlbumQueries.GetAllAlbum()
            };
            return View(data);
        }

        [HttpPost]
        public async Task<IActionResult> AlbumUpload(UploadMediaViewModel uploadMedia)
        {

            var files = HttpContext.Request.Form.Files;
            if (string.IsNullOrEmpty(uploadMedia.AlbumId))
            {
                TempData["MessageError"] = "Select Album to Upload Files!";
                return Json(new { Result = "failed" });
            }
            if (!files.Any())
            {
                TempData["MessageError"] = "No Files!";
                return Json(new { Result = "failed" });
            }

            if (files.Any())
            {
                foreach (var file in files)
                {
                    if (file.Length > 0)
                    {
                        //Getting FileName
                        var fileName = Path.GetFileName(file.FileName);

                        //Getting file Extension
                        var fileExtension = Path.GetExtension(fileName);

                        var albumdetails = _iAlbumQueries.GetAlbum(Convert.ToInt32(uploadMedia.AlbumId));

                        var albumUpload = new AlbumUploadModel();
                        var directoryname = "";
                        if (Convert.ToInt32(albumdetails.MediaTypeId) == (int)MediaType.Audio)
                        {
                            albumUpload.VirtualPath = $"/Album/Audio/{albumdetails.AlbumName}/{fileName}";
                            directoryname = "Audio";
                        }
                        else if (Convert.ToInt32(albumdetails.MediaTypeId) == (int)MediaType.Photo)
                        {
                            albumUpload.VirtualPath = $"/Album/Photo/{albumdetails.AlbumName}/{fileName}";
                            directoryname = "Photo";
                        }
                        else if (Convert.ToInt32(albumdetails.MediaTypeId) == (int)MediaType.Video)
                        {
                            albumUpload.VirtualPath = $"/Album/Video/{albumdetails.AlbumName}/{fileName}";
                            directoryname = "Video";
                        }


                        await using var target = new MemoryStream();
                        await file.CopyToAsync(target);
                        var physicalPath =
                            $"{new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")).Root}Album\\{directoryname}\\{albumdetails.Album}\\{fileName}";

                        await using FileStream fs = System.IO.File.Create(physicalPath);
                        await file.CopyToAsync(fs);
                        fs.Flush();
                        new FileExtensionContentTypeProvider().TryGetContentType(fileName, out var contentType);

                        albumUpload.AlbumUploadId = 0;
                        albumUpload.FileName = fileName;
                        albumUpload.AlbumId = Convert.ToInt32(uploadMedia.AlbumId);
                        albumUpload.CreatedBy = HttpContext.Session.GetInt32(AllSessionKeys.UserId);
                        albumUpload.CreatedOn = DateTime.Now;
                        albumUpload.FileExtension = fileExtension;
                        albumUpload.IsActive = true;
                        albumUpload.FileType = contentType;
                        albumUpload.PhysicalPath = physicalPath;

                        _albumUploadCommand.Add(albumUpload);


                    }
                }
            }

            TempData["MessageSuccess"] = "Files Uploaded Successfully!";

            return Json(new { Result = "success" });
        }


        [HttpGet]
        public IActionResult AllUploadedAlbum()
        {
            var data = new UploadMediaViewModel()
            {
                ListofAlbum = _iAlbumQueries.GetAllAlbum()
            };
            return View(data);
        }


        [HttpPost]
        public IActionResult GridAllAlbumUploads()
        {
            try
            {
                var draw = HttpContext.Request.Form["draw"].FirstOrDefault();
                var start = Request.Form["start"].FirstOrDefault();
                var length = Request.Form["length"].FirstOrDefault();
                var sortColumn = Request.Form["columns[" + Request.Form["order[0][column]"].FirstOrDefault() + "][name]"].FirstOrDefault();
                var sortColumnDirection = Request.Form["order[0][dir]"].FirstOrDefault();
                var searchValue = Request.Form["search[value]"].FirstOrDefault();
                var albumId = string.IsNullOrEmpty(Request.Form["albumId"].FirstOrDefault()) ? "0" : Request.Form["albumId"].FirstOrDefault();

                int? album = null;
                if (!string.IsNullOrEmpty(albumId))
                {
                    album = Convert.ToInt32(albumId);
                }

                int pageSize = length != null ? Convert.ToInt32(length) : 0;
                int skip = start != null ? Convert.ToInt32(start) : 0;
                int recordsTotal = 0;
                var querydata = _iMediaAssetsQueries.ShowAllAlbums(sortColumn, sortColumnDirection, searchValue, album);
                recordsTotal = querydata.Count();
                var data = querydata.Skip(skip).Take(pageSize).ToList();
                var jsonData = new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = data };
                return Ok(jsonData);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
