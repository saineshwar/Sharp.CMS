using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;
using Sharp.CMS.Common;
using Sharp.CMS.Data.CommonMasters.Queries;
using Sharp.CMS.Data.NewPage.Command;
using Sharp.CMS.Data.NewPage.Queries;
using Sharp.CMS.Models.InnerPage;
using Sharp.CMS.Models.Page;
using Sharp.CMS.ViewModels.Attachments;
using Sharp.CMS.ViewModels.InnerPage;
using Sharp.CMS.ViewModels.Page;
using Sharp.CMS.Web.Filters;
using Sharp.CMS.Web.Notification;

namespace Sharp.CMS.Web.Areas.Administration.Controllers
{

    [Area("Administration")]
    [SessionTimeOut]
    public class InnerNewPageController : Controller
    {
        private readonly IMapper _mapper;
        private readonly INotificationService _notificationService;
        private readonly INewContainerQueries _inewContainerQueries;
        private readonly ICommonMastersQueries _commonMastersQueries;
        private readonly IInnerNewPageQueries _IInnerNewPageQueries;
        private readonly IInnerNewPageCommand _IInnerNewPageCommand;
        private readonly INewPageQueries _INewPageQueries;
        public InnerNewPageController(IMapper mapper, INotificationService notificationService, 
            INewContainerQueries inewContainerQueries, 
            ICommonMastersQueries commonMastersQueries, 
            IInnerNewPageQueries iInnerNewPageQueries, 
            IInnerNewPageCommand innerNewPageCommand, 
            INewPageQueries newPageQueries)
        {
            _mapper = mapper;
            _notificationService = notificationService;
            _inewContainerQueries = inewContainerQueries;
            _commonMastersQueries = commonMastersQueries;
            _IInnerNewPageQueries = iInnerNewPageQueries;
            _IInnerNewPageCommand = innerNewPageCommand;
            _INewPageQueries = newPageQueries;
        }

        [HttpGet]
        public IActionResult Create()
        {
            var pageViewModel = new InnerPageViewModel()
            {
                ListofStatus = _commonMastersQueries.GetStatusList(),
                ListofPages = _INewPageQueries.ListofPages()
            };
            return View(pageViewModel);
        }

        [HttpPost]
        public async Task<IActionResult> Create(InnerPageViewModel pageViewModel)
        {
            pageViewModel.ListofStatus = _commonMastersQueries.GetStatusList();
            pageViewModel.ListofPages = _INewPageQueries.ListofPages();

            if (ModelState.IsValid)
            {
                if (_IInnerNewPageQueries.CheckPageNameExists(pageViewModel.PageName))
                {
                    _notificationService.DangerNotification("Message", "Page Name Entered already Exists.");
                    return View(pageViewModel);
                }

                var user = HttpContext.Session.GetInt32(AllSessionKeys.UserId);
                var currentdate = DateTime.Now;

                var pageModel = _mapper.Map<InnerPageModel>(pageViewModel);
                pageModel.CreatedOn = currentdate;
                pageModel.InnerPageId = 0;
                pageModel.CreatedBy = user;
                pageModel.Status = pageViewModel.StatusId;
                pageModel.PageDetails = new InnerPageDetailsModel()
                {
                    MetaDescription_EN = pageViewModel.MetaDescriptionEN,
                    MetaDescription_LL = pageViewModel.MetaDescriptionLl,
                    MetaKeywords_EN = pageViewModel.MetaKeywordsEN,
                    MetaKeywords_LL = pageViewModel.MetaKeywordsLl,
                    PageHeading_EN = pageViewModel.PageHeading,
                    PageHeading_LL = pageViewModel.PageHeadingLl,
                    InnerPageDetailsId = 0
                };


                if (!string.IsNullOrEmpty(pageViewModel.Permalink))
                {
                    pageViewModel.PageName = "";
                }

                if (!string.IsNullOrEmpty(pageViewModel.PageName))
                {
                    pageViewModel.Permalink = "";
                }


                var pagecontainerModel = new InnerContainersModel();
                pagecontainerModel.InnerContainersId = 0;
                pagecontainerModel.ContainerDescription_En = HttpUtility.HtmlDecode(pageViewModel.ContainerDescriptionEn);
                pagecontainerModel.ContainerDescription_Ll = HttpUtility.HtmlDecode(pageViewModel.ContainerDescriptionLl);
                pagecontainerModel.CreatedBy = user;
                pagecontainerModel.CreatedOn = currentdate;
                pagecontainerModel.Status = pageViewModel.IsActive;


                // ReSharper disable once CollectionNeverQueried.Local
                var listofattachments = new List<InnerAttachmentsViewModel>();

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

                            var attachments = new InnerAttachmentsViewModel
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

                var result = _IInnerNewPageCommand.Add(pageModel, pagecontainerModel, listofattachments);

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
            var editmodel = _IInnerNewPageQueries.GetPageDetailsbyPageId(id.Value);

            if (editmodel == null)
            {
                _notificationService.DangerNotification("Message", "Something went wrong please try again.");

                return RedirectToAction("Index");
            }
            editmodel.ListofStatus = _commonMastersQueries.GetStatusList();
            editmodel.ListofPages = _INewPageQueries.ListofPages();
            var listofattachment = _inewContainerQueries.GetListofAttachmentsbyPageId(id.Value);
            editmodel.ListofAttachments = listofattachment.Count > 0 ? listofattachment : new List<DisplayAttachmentsViewModel>();
            return View(editmodel);
        }


        [HttpPost]
        public async Task<IActionResult> Edit(EditInnerPageViewModel pageViewModel)
        {
            if (ModelState.IsValid)
            {

                var editmodel = _IInnerNewPageQueries.GetPageDetailsbyPageId(pageViewModel.InnerPageId);

                if (pageViewModel.PageName == editmodel.PageName)
                {
                    var user = HttpContext.Session.GetInt32(AllSessionKeys.UserId);
                    var currentdate = DateTime.Now;

                    var pageModel = _mapper.Map<InnerPageModel>(pageViewModel);
                    pageModel.ModifiedOn = currentdate;
                    pageModel.ModifiedBy = user;
                    pageModel.Status = pageViewModel.StatusId;
                    pageModel.PageDetails = new InnerPageDetailsModel()
                    {
                        MetaDescription_EN = pageViewModel.MetaDescriptionEN,
                        MetaDescription_LL = pageViewModel.MetaDescriptionLl,
                        MetaKeywords_EN = pageViewModel.MetaKeywordsEN,
                        MetaKeywords_LL = pageViewModel.MetaKeywordsLl,
                        PageHeading_EN = pageViewModel.PageHeading,
                        PageHeading_LL = pageViewModel.PageHeadingLl,
                        InnerPageDetailsId = editmodel.PageDetailsId
                    };


                    var pagecontainerModel = new InnerContainersModel();
                    pagecontainerModel.InnerContainersId = editmodel.ContainersId;
                    pagecontainerModel.ContainerDescription_En = HttpUtility.HtmlDecode(pageViewModel.ContainerDescriptionEn);
                    pagecontainerModel.ContainerDescription_Ll = HttpUtility.HtmlDecode(pageViewModel.ContainerDescriptionLl);
                    pagecontainerModel.ModifiedBy = user;
                    pagecontainerModel.ModifiedOn = currentdate;
                    pagecontainerModel.Status = pageViewModel.IsActive;
                    pagecontainerModel.InnerPageId = editmodel.InnerPageId;

                    // ReSharper disable once CollectionNeverQueried.Local
                    var listofattachments = new List<InnerAttachmentsViewModel>();
                    #region Files

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

                                var attachments = new InnerAttachmentsViewModel
                                {
                                    CreatedBy = user,
                                    GenerateAttachmentName = newFileName,
                                    OriginalAttachmentName = file.FileName,
                                    AttachmentType = file.ContentType,
                                    CreatedOn = DateTime.Now,
                                    DirectoryName = directoryname,
                                    VirtualPath = filePath,
                                    PhysicalPath = physicalPath,
                                    InnerPageId = pageViewModel.InnerPageId
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
                    #endregion

                    var result = _IInnerNewPageCommand.Update(pageModel, pagecontainerModel, listofattachments);
                }
                else
                {
                    if (_IInnerNewPageQueries.CheckPageNameExists(pageViewModel.PageName))
                    {
                        _notificationService.DangerNotification("Message", "Page Name already Exits");
                    }
                    else
                    {
                        var user = HttpContext.Session.GetInt32(AllSessionKeys.UserId);
                        var currentdate = DateTime.Now;

                        var pageModel = _mapper.Map<InnerPageModel>(pageViewModel);
                        pageModel.ModifiedOn = currentdate;
                        pageModel.ModifiedBy = user;
                        pageModel.Status = pageViewModel.StatusId;
                        pageModel.PageDetails = new InnerPageDetailsModel()
                        {
                            MetaDescription_EN = pageViewModel.MetaDescriptionEN,
                            MetaDescription_LL = pageViewModel.MetaDescriptionLl,
                            MetaKeywords_EN = pageViewModel.MetaKeywordsEN,
                            MetaKeywords_LL = pageViewModel.MetaKeywordsLl,
                            PageHeading_EN = pageViewModel.PageHeading,
                            PageHeading_LL = pageViewModel.PageHeadingLl,
                            InnerPageDetailsId = editmodel.PageDetailsId
                        };


                        var pagecontainerModel = new InnerContainersModel();
                        pagecontainerModel.InnerContainersId = editmodel.ContainersId;
                        pagecontainerModel.ContainerDescription_En = HttpUtility.HtmlDecode(pageViewModel.ContainerDescriptionEn);
                        pagecontainerModel.ContainerDescription_Ll = HttpUtility.HtmlDecode(pageViewModel.ContainerDescriptionLl);
                        pagecontainerModel.ModifiedBy = user;
                        pagecontainerModel.ModifiedOn = currentdate;
                        pagecontainerModel.Status = pageViewModel.IsActive;
                        pagecontainerModel.InnerPageId = editmodel.InnerPageId;

                        // ReSharper disable once CollectionNeverQueried.Local
                        var listofattachments = new List<InnerAttachmentsViewModel>();
                        #region Files

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

                                    var attachments = new InnerAttachmentsViewModel
                                    {
                                        CreatedBy = user,
                                        GenerateAttachmentName = newFileName,
                                        OriginalAttachmentName = file.FileName,
                                        AttachmentType = file.ContentType,
                                        CreatedOn = DateTime.Now,
                                        DirectoryName = directoryname,
                                        VirtualPath = filePath,
                                        PhysicalPath = physicalPath,
                                        InnerPageId = pageViewModel.InnerPageId
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
                        #endregion

                        var result = _IInnerNewPageCommand.Update(pageModel, pagecontainerModel, listofattachments);
                    }
                }
            }

            return View(pageViewModel);
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
                var records = _IInnerNewPageQueries.ShowAllPages(sortColumn, sortColumnDirection, searchValue);
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
            if (_IInnerNewPageQueries.CheckPageNameExists(pageTitleRequest.PageName))
            {
                return Json(new { result = "Y" });
            }
            return Json(new { result = "N" });
        }

        public JsonResult Deactivate(RequestDeleteInnerPage requestDelete)
        {
            try
            {
                var data = _IInnerNewPageQueries.GetInnerPage(requestDelete.InnerPageId);
                var result = _IInnerNewPageCommand.Deactivate(data);
                if (result)
                {
                    _notificationService.SuccessNotification("Message", "The Inner Page Deactivated successfully!");
                    return Json(new { Result = "success" });
                }
                else
                {
                    return Json(new { Result = "failed", Message = "Cannot Delete" });
                }
            }
            catch (Exception)
            {
                return Json(new { Result = "failed", Message = "Cannot Delete" });
            }
        }


    }
}
