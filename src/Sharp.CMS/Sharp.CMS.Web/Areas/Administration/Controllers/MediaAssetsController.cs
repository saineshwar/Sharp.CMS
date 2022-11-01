using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;
using Sharp.CMS.Common;
using Sharp.CMS.Data.MediaAssets.Command;
using Sharp.CMS.Data.MediaAssets.Queries;
using Sharp.CMS.Models.Medias;
using Sharp.CMS.ViewModels.Attachments;
using Sharp.CMS.Web.Filters;

namespace Sharp.CMS.Web.Areas.Administration.Controllers
{
    [Area("Administration")]
    [SessionTimeOut]
    [AuthorizeSuperAdmin]
    public class MediaAssetsController : Controller
    {
        private readonly IMediaHistoryCommand _iMediaHistoryCommand;
        private readonly IMediaAssetsQueries _iMediaAssetsQueries;
        public MediaAssetsController(IMediaHistoryCommand mediaHistoryCommand, IMediaAssetsQueries mediaAssetsQueries)
        {
            _iMediaHistoryCommand = mediaHistoryCommand;
            _iMediaAssetsQueries = mediaAssetsQueries;
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
                        var physicalPath = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Media", "Content")).Root + $@"{fileName}";
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
                var sortColumn = Request.Form["columns[" + Request.Form["order[0][column]"].FirstOrDefault() + "][name]"].FirstOrDefault();
                var sortColumnDirection = Request.Form["order[0][dir]"].FirstOrDefault();
                var searchValue = Request.Form["search[value]"].FirstOrDefault();
                int pageSize = length != null ? Convert.ToInt32(length) : 0;
                int skip = start != null ? Convert.ToInt32(start) : 0;
                int recordsTotal = 0;
                var rolesdata = _iMediaAssetsQueries.ShowAllUploadedPhotos(sortColumn, sortColumnDirection, searchValue);
                recordsTotal = rolesdata.Count();
                var data = rolesdata.Skip(skip).Take(pageSize).ToList();
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
