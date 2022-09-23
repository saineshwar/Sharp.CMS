using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sharp.CMS.Common;
using Sharp.CMS.Data.NewPage.Command;
using Sharp.CMS.Data.NewPage.Queries;
using Sharp.CMS.Models.Page;
using Sharp.CMS.ViewModels.Page;
using Sharp.CMS.Web.Filters;
using Sharp.CMS.Web.Notification;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.Extensions.FileProviders;
using Sharp.CMS.ViewModels.Attachments;


namespace Sharp.CMS.Web.Areas.Administration.Controllers
{
    [Area("Administration")]
    [SessionTimeOut]
    public class ContainerController : Controller
    {
        private readonly INewPageQueries _iNewPageQueries;
        private readonly INewContainerCommand _iNewContainerCommand;
        private readonly INewContainerQueries _iNewContainerQueries;
        private readonly INotificationService _notificationService;
        private readonly IMapper _mapper;
        public ContainerController(INewPageQueries newPageQueries,
            INewContainerCommand newContainerCommand,
            INewContainerCommand iNewContainerCommand,
            INewContainerQueries iNewContainerQueries,
            INotificationService notificationService,
            IMapper mapper)
        {
            _iNewPageQueries = newPageQueries;
            _iNewContainerCommand = iNewContainerCommand;
            _iNewContainerQueries = iNewContainerQueries;
            _notificationService = notificationService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Create()
        {
            var pagecontainer = new ContainersViewModel()
            {
                ListofStatus = _iNewPageQueries.ListofPages()
            };
            return View(pagecontainer);
        }

        [HttpPost]
        public async Task<IActionResult> Create(ContainersViewModel containersView)
        {
            containersView.ListofStatus = _iNewPageQueries.ListofPages();

            if (ModelState.IsValid)
            {
                if (_iNewContainerQueries.CheckContainerNameExists(containersView.ContainerName))
                {
                    _notificationService.DangerNotification("Message", "Container Name Entered already Exists.");
                    return View(containersView);
                }
                var currentdate = DateTime.Now;
                var user = HttpContext.Session.GetInt32(AllSessionKeys.UserId);

                var pagecontainerModel = _mapper.Map<ContainersModel>(containersView);
                pagecontainerModel.ContainersId = 0;
                pagecontainerModel.PageId = Convert.ToInt32(containersView.PageId);
                pagecontainerModel.ContainerDescription_En = HttpUtility.HtmlDecode(containersView.ContainerDescriptionLl);
                pagecontainerModel.ContainerDescription_Ll = HttpUtility.HtmlDecode(containersView.ContainerDescriptionLl);
                pagecontainerModel.CreatedBy = user;
                pagecontainerModel.CreatedOn = currentdate;
                pagecontainerModel.Status = containersView.Status;

                // ReSharper disable once CollectionNeverQueried.Local
                var listofattachments = new List<AttachmentsViewModel>();

                var files = HttpContext.Request.Form.Files;
                if (files.Any())
                {
                    foreach (var file in files)
                    {
                        if (file.Length > 0)
                        {
                            //Getting FileName
                            var fileName = Path.GetFileName(file.FileName);
                            //Assigning Unique Filename (Guid)
                            var myUniqueFileName = Convert.ToString(Guid.NewGuid().ToString("N"));
                            //Getting file Extension
                            var fileExtension = Path.GetExtension(fileName);
                            // concatenating  FileName + FileExtension
                            var newFileName = String.Concat(myUniqueFileName, fileExtension);

                            await using var target = new MemoryStream();
                            await file.CopyToAsync(target);
                            string directoryname = "Media";

                            var physicalPath = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Media", "Content")).Root + $@"{newFileName}";

                            string filePath = "~/Media/Content/" + newFileName;

                            var attachments = new AttachmentsViewModel
                            {
                                PageId = Convert.ToInt32(containersView.PageId),
                                CreatedBy = user,
                                GenerateAttachmentName = newFileName,
                                OriginalAttachmentName = file.FileName,
                                AttachmentType = fileExtension,
                                CreatedOn = DateTime.Now,
                                DirectoryName = directoryname,
                                VirtualPath = filePath,
                                PhysicalPath = physicalPath
                            };


                            await using (FileStream fs = System.IO.File.Create(physicalPath))
                            {
                                await file.CopyToAsync(fs);
                                fs.Flush();
                            }

                            listofattachments.Add(attachments);

                        }
                    }
                }


                var result = _iNewContainerCommand.Add(pagecontainerModel, listofattachments);
                if (result)
                {
                    _notificationService.SuccessNotification("Message", $"Page Container Details Saved Successfully.");
                    return RedirectToAction("Index");
                }
            }

            return View(containersView);
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult GridAllContainers()
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
                var records = _iNewContainerQueries.ShowAllContainers(sortColumn, sortColumnDirection, searchValue);
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

        [HttpGet]
        public IActionResult Edit(int? id)
        {
            if (id == null)
            {
                _notificationService.DangerNotification("Message", "Something went wrong please try again.");

                return RedirectToAction("Index");
            }
            var editmodel = _newPageFooterQueries.GetPageFooterbyPageFooterId(id.Value);
            if (editmodel == null)
            {
                _notificationService.DangerNotification("Message", "Something went wrong please try again.");

                return RedirectToAction("Index");
            }

            return View(editmodel);
        }

    }
}
