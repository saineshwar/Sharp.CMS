using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.FileProviders;
using Sharp.CMS.Common;
using Sharp.CMS.Data.CommonMasters.Queries;
using Sharp.CMS.Data.NewPage.Command;
using Sharp.CMS.Data.NewPage.Queries;
using Sharp.CMS.Models.Page;
using Sharp.CMS.ViewModels.Attachments;
using Sharp.CMS.ViewModels.MenuCategory;
using Sharp.CMS.ViewModels.Page;
using Sharp.CMS.Web.Filters;
using Sharp.CMS.Web.Notification;

namespace Sharp.CMS.Web.Areas.Administration.Controllers
{
    [Area("Administration")]
    [SessionTimeOut]
    public class NewPageController : Controller
    {
        private readonly IMapper _mapper;
        private readonly INewPageCommand _iNewPageCommand;
        private readonly INewPageQueries _iNewPageQueries;
        private readonly INotificationService _notificationService;
        private readonly ICommonMastersQueries _commonMastersQueries;
        public NewPageController(IMapper mapper,
            INewPageCommand newPageCommand,
            INewPageQueries newPageQueries,
            INotificationService notificationService,
            ICommonMastersQueries commonMastersQueries)
        {
            _mapper = mapper;
            _iNewPageCommand = newPageCommand;
            _iNewPageQueries = newPageQueries;
            _notificationService = notificationService;
            _commonMastersQueries = commonMastersQueries;
        }

        [HttpGet]
        public IActionResult Create()
        {
            var pageViewModel = new PageViewModel()
            {
                ListofStatus = _commonMastersQueries.GetStatusList()
            };
            return View(pageViewModel);
        }

        [HttpPost]
        public async Task<IActionResult> Create(PageViewModel pageViewModel)
        {
            pageViewModel.ListofStatus = _commonMastersQueries.GetStatusList();

            if (ModelState.IsValid)
            {
                var user = HttpContext.Session.GetInt32(AllSessionKeys.UserId);
                var currentdate = DateTime.Now;

                var pageModel = _mapper.Map<PageModel>(pageViewModel);
                pageModel.CreatedOn = currentdate;
                pageModel.PageId = 0;
                pageModel.CreatedBy = user;
                pageModel.Status = pageViewModel.StatusId;
                pageModel.PageDetails = new PageDetailsModel()
                {
                    MetaDescription_EN = pageViewModel.MetaDescriptionEN,
                    MetaDescription_LL = pageViewModel.MetaDescriptionLl,
                    MetaKeywords_EN = pageViewModel.MetaKeywordsEN,
                    MetaKeywords_LL = pageViewModel.MetaKeywordsLl,
                    PageHeading_EN = pageViewModel.PageHeading,
                    PageHeading_LL = pageViewModel.PageHeadingLl,
                    PageDetailsId = 0
                };

                if (_iNewPageQueries.CheckPageNameExists(pageViewModel.PageName))
                {
                    _notificationService.DangerNotification("Message", "Page Name Entered already Exists.");
                    return View(pageViewModel);
                }

                if (!string.IsNullOrEmpty(pageViewModel.Permalink))
                {
                    pageViewModel.PageName = "";
                }

                if (!string.IsNullOrEmpty(pageViewModel.PageName))
                {
                    pageViewModel.Permalink = "";
                }


                var pagecontainerModel = new ContainersModel();
                pagecontainerModel.ContainersId = 0;
                pagecontainerModel.ContainerDescription_En = HttpUtility.HtmlDecode(pageViewModel.ContainerDescriptionEn);
                pagecontainerModel.ContainerDescription_Ll = HttpUtility.HtmlDecode(pageViewModel.ContainerDescriptionLl);
                pagecontainerModel.CreatedBy = user;
                pagecontainerModel.CreatedOn = currentdate;
                pagecontainerModel.Status = pageViewModel.IsActive;
       

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

                            string filePath = "/Media/Content/" + newFileName;

                            var attachments = new AttachmentsViewModel
                            {
                                CreatedBy = user,
                                GenerateAttachmentName = newFileName,
                                OriginalAttachmentName = file.FileName,
                                AttachmentType = file.ContentType,
                                CreatedOn = DateTime.Now,
                                DirectoryName = directoryname,
                                VirtualPath = filePath,
                                PhysicalPath = physicalPath,

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

                var result = _iNewPageCommand.Add(pageModel, pagecontainerModel, listofattachments);

                if (result)
                {
                    _notificationService.SuccessNotification("Message", $"Page Details Saved Successfully.");
                    return RedirectToAction("Index");
                }
            }

            return View(pageViewModel);
        }



        [HttpGet]
        public IActionResult Edit(int? id)
        {
            if (id == null)
            {
                _notificationService.DangerNotification("Message", "Something went wrong please try again.");

                return RedirectToAction("Index");
            }
            var editmodel = _iNewPageQueries.GetPageDetailsbyPageId(id.Value);

            if (editmodel == null)
            {
                _notificationService.DangerNotification("Message", "Something went wrong please try again.");

                return RedirectToAction("Index");
            }
            editmodel.ListofStatus = _commonMastersQueries.GetStatusList();
            return View(editmodel);
        }


        [HttpPost]
        public IActionResult Edit(EditPageViewModel editPage)
        {
            if (ModelState.IsValid)
            {
                var editmodel = _iNewPageQueries.GetPageDetailsbyPageId(editPage.PageId);



            }

            return View(editPage);
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult GridAllPages()
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
                var records = _iNewPageQueries.ShowAllPages(sortColumn, sortColumnDirection, searchValue);
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

        public IActionResult CheckTitleExists(PageTitleRequest pageTitleRequest)
        {
            if (_iNewPageQueries.CheckPageNameExists(pageTitleRequest.PageName))
            {
                return Json(new { result = "Y" });
            }
            return Json(new { result = "N" });
        }

    }
}
