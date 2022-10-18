using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using Sharp.CMS.Common;
using Sharp.CMS.Data.CommonMasters.Queries;
using Sharp.CMS.Data.NewPage.Command;
using Sharp.CMS.Data.NewPage.Queries;
using Sharp.CMS.Models.Page;
using Sharp.CMS.ViewModels.Attachments;
using Sharp.CMS.ViewModels.Page;
using Sharp.CMS.Web.Filters;
using Sharp.CMS.Web.Notification;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Mvc.Rendering;
using Sharp.CMS.ViewModels.InnerPage;

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
        private readonly INewContainerQueries _inewContainerQueries;

        public NewPageController(IMapper mapper,
            INewPageCommand newPageCommand,
            INewPageQueries newPageQueries,
            INotificationService notificationService,
            ICommonMastersQueries commonMastersQueries, INewContainerQueries newContainerQueries)
        {
            _mapper = mapper;
            _iNewPageCommand = newPageCommand;
            _iNewPageQueries = newPageQueries;
            _notificationService = notificationService;
            _commonMastersQueries = commonMastersQueries;
            _inewContainerQueries = newContainerQueries;
        }

        [HttpGet]
        public IActionResult Create()
        {
            var pageViewModel = new PageViewModel()
            {
                ListofStatus = _commonMastersQueries.GetStatusList(),
            };
            return View(pageViewModel);
        }

        [HttpPost]
        public async Task<IActionResult> Create(PageViewModel pageViewModel)
        {
            pageViewModel.ListofStatus = _commonMastersQueries.GetStatusList();

            if (ModelState.IsValid)
            {
                if (_iNewPageQueries.CheckPageNameExists(pageViewModel.PageName, string.IsNullOrEmpty(pageViewModel.HiddenParentPageId) ? null : Convert.ToInt32(pageViewModel.HiddenParentPageId)))
                {
                    _notificationService.DangerNotification("Message", "Page Name Entered already Exists.");
                    return View(pageViewModel);
                }

                var user = HttpContext.Session.GetInt32(AllSessionKeys.UserId);
                var currentdate = DateTime.Now;

                var pageModel = _mapper.Map<PageModel>(pageViewModel);
                pageModel.CreatedOn = currentdate;
                pageModel.PageId = 0;
                pageModel.CreatedBy = user;
                pageModel.Status = pageViewModel.StatusId;


                pageModel.IsPublished = pageViewModel.StatusId == 2;


                if (!string.IsNullOrEmpty(pageViewModel.HiddenParentPageId))
                {
                    pageModel.ParentPageId = Convert.ToInt32(pageViewModel.HiddenParentPageId);
                }

                if (!string.IsNullOrEmpty(pageViewModel.HiddenChildPageId))
                {
                    pageModel.ChildPageId = Convert.ToInt32(pageViewModel.HiddenChildPageId);
                }

                pageModel.IsChildPage = !string.IsNullOrEmpty(pageViewModel.HiddenParentPageId);
                pageModel.IsSubChildPage = !string.IsNullOrEmpty(pageViewModel.HiddenChildPageId);

                pageModel.PageDetails = new PageDetailsModel();
                pageModel.PageDetails.PageDetailsId = 0;
                pageModel.PageDetails.MetaDescription_EN = pageViewModel.MetaDescriptionEN;
                pageModel.PageDetails.MetaDescription_LL = pageViewModel.MetaDescriptionLl;
                pageModel.PageDetails.MetaKeywords_EN = pageViewModel.MetaKeywordsEN;
                pageModel.PageDetails.MetaKeywords_LL = pageViewModel.MetaKeywordsLl;
                pageModel.PageDetails.PageHeading_EN = pageViewModel.PageHeading;
                pageModel.PageDetails.PageHeading_LL = pageViewModel.PageHeadingLl;


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
            var listofattachment = _inewContainerQueries.GetListofAttachmentsbyPageId(id.Value);
            editmodel.ListofAttachments = listofattachment.Count > 0 ? listofattachment : new List<DisplayAttachmentsViewModel>();
         
            return View(editmodel);
        }


        [HttpPost]
        public async Task<IActionResult> Edit(EditPageViewModel pageViewModel)
        {
            if (ModelState.IsValid)
            {

                var editmodel = _iNewPageQueries.GetPageDetailsbyPageId(pageViewModel.PageId);

                if (pageViewModel.PageName == editmodel.PageName)
                {
                    var user = HttpContext.Session.GetInt32(AllSessionKeys.UserId);
                    var currentdate = DateTime.Now;

                    var pageModel = _mapper.Map<PageModel>(pageViewModel);
                    pageModel.ModifiedOn = currentdate;
                    pageModel.ModifiedBy = user;
                    pageModel.Status = pageViewModel.StatusId;
                    pageModel.PageDetails = new PageDetailsModel()
                    {
                        MetaDescription_EN = pageViewModel.MetaDescriptionEN,
                        MetaDescription_LL = pageViewModel.MetaDescriptionLl,
                        MetaKeywords_EN = pageViewModel.MetaKeywordsEN,
                        MetaKeywords_LL = pageViewModel.MetaKeywordsLl,
                        PageHeading_EN = pageViewModel.PageHeading,
                        PageHeading_LL = pageViewModel.PageHeadingLl,
                        PageDetailsId = editmodel.PageDetailsId
                    };


                    var pagecontainerModel = new ContainersModel();
                    pagecontainerModel.ContainersId = editmodel.ContainersId;
                    pagecontainerModel.ContainerDescription_En = HttpUtility.HtmlDecode(pageViewModel.ContainerDescriptionEn);
                    pagecontainerModel.ContainerDescription_Ll = HttpUtility.HtmlDecode(pageViewModel.ContainerDescriptionLl);
                    pagecontainerModel.ModifiedBy = user;
                    pagecontainerModel.ModifiedOn = currentdate;
                    pagecontainerModel.Status = pageViewModel.IsActive;
                    pagecontainerModel.PageId = editmodel.PageId;

                    // ReSharper disable once CollectionNeverQueried.Local
                    var listofattachments = new List<AttachmentsViewModel>();
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
                                    PageId = pageViewModel.PageId
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

                    var result = _iNewPageCommand.Update(pageModel, pagecontainerModel, listofattachments);
                }
                else
                {
                    if (_iNewPageQueries.CheckPageNameExists(pageViewModel.PageName, pageViewModel.PageId))
                    {
                        _notificationService.DangerNotification("Message", "Page Name already Exits");
                    }
                    else
                    {
                        var user = HttpContext.Session.GetInt32(AllSessionKeys.UserId);
                        var currentdate = DateTime.Now;

                        var pageModel = _mapper.Map<PageModel>(pageViewModel);
                        pageModel.ModifiedOn = currentdate;
                        pageModel.ModifiedBy = user;
                        pageModel.Status = pageViewModel.StatusId;
                        pageModel.PageDetails = new PageDetailsModel()
                        {
                            MetaDescription_EN = pageViewModel.MetaDescriptionEN,
                            MetaDescription_LL = pageViewModel.MetaDescriptionLl,
                            MetaKeywords_EN = pageViewModel.MetaKeywordsEN,
                            MetaKeywords_LL = pageViewModel.MetaKeywordsLl,
                            PageHeading_EN = pageViewModel.PageHeading,
                            PageHeading_LL = pageViewModel.PageHeadingLl,
                            PageDetailsId = editmodel.PageDetailsId
                        };


                        var pagecontainerModel = new ContainersModel();
                        pagecontainerModel.ContainersId = editmodel.ContainersId;
                        pagecontainerModel.ContainerDescription_En = HttpUtility.HtmlDecode(pageViewModel.ContainerDescriptionEn);
                        pagecontainerModel.ContainerDescription_Ll = HttpUtility.HtmlDecode(pageViewModel.ContainerDescriptionLl);
                        pagecontainerModel.ModifiedBy = user;
                        pagecontainerModel.ModifiedOn = currentdate;
                        pagecontainerModel.Status = pageViewModel.IsActive;
                        pagecontainerModel.PageId = editmodel.PageId;

                      
                        // ReSharper disable once CollectionNeverQueried.Local
                        var listofattachments = new List<AttachmentsViewModel>();
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
                                        PageId = pageViewModel.PageId
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

                        var result = _iNewPageCommand.Update(pageModel, pagecontainerModel, listofattachments);
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
            if (_iNewPageQueries.CheckPageNameExists(pageTitleRequest.PageName, pageTitleRequest.ParentPageId))
            {
                return Json(new { result = "Y" });
            }
            return Json(new { result = "N" });
        }

        public JsonResult Deactivate(RequestDelete requestDelete)
        {
            try
            {
                if (requestDelete.Id == null)
                {
                    return Json(new { Result = "failed", Message = "Something Went Wrong" });
                }

                var data = _iNewPageQueries.GetPagebyPageId(requestDelete.Id.Value);
                var result = _iNewPageCommand.Deactivate(data);
                if (result)
                {
                    _notificationService.SuccessNotification("Message", "The Page Deactivated successfully!");
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

        public JsonResult SetHomePage(RequestDelete requestDelete)
        {
            try
            {
                if (requestDelete.Id == null)
                {
                    return Json(new { Result = "failed", Message = "Something Went Wrong" });
                }

                var result = _iNewPageCommand.SetDefaultHomePage(requestDelete.Id);
                if (result)
                {
                    _notificationService.SuccessNotification("Message", "HomePage Setted Successfully!");
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

        public ActionResult GetParentPage(string pagename)
        {
            var parentPage = _iNewPageQueries.GetAutoCompleteParentPage(pagename);
            return Json(parentPage);
        }

        public ActionResult GetChildPage(string childpagename, string parentpageid)
        {
            var childpage = _iNewPageQueries.GetAutoCompleteChildPage(childpagename, parentpageid);
            return Json(childpage);
        }
    }
}
