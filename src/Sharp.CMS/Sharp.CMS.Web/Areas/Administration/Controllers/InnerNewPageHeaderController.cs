using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sharp.CMS.Common;
using Sharp.CMS.Data.InnerPages.Command;
using Sharp.CMS.Data.InnerPages.Queries;
using Sharp.CMS.Models.InnerPage;
using Sharp.CMS.ViewModels.InnerPage;
using Sharp.CMS.Web.Filters;
using Sharp.CMS.Web.Notification;
using System;
using System.Linq;
using System.Web;

namespace Sharp.CMS.Web.Areas.Administration.Controllers
{
    [Area("Administration")]
    [SessionTimeOut]
    public class InnerNewPageHeaderController : Controller
    {
        private readonly IInnerNewPageHeaderCommand _IInnerNewPageHeaderCommand;
        private readonly IInnerNewPageHeaderQueries _IInnerNewPageHeaderQueries;
        private readonly INotificationService _notificationService;
        private readonly IMapper _mapper;
        public InnerNewPageHeaderController(IInnerNewPageHeaderCommand innerNewPageHeaderCommand, IInnerNewPageHeaderQueries iInnerNewPageHeaderQueries, INotificationService notificationService, IMapper mapper)
        {
            _IInnerNewPageHeaderCommand = innerNewPageHeaderCommand;
            _IInnerNewPageHeaderQueries = iInnerNewPageHeaderQueries;
            _notificationService = notificationService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Create()
        {
            var pageheader = new InnerPageHeaderViewModel();
            return View(pageheader);
        }


        [HttpPost]
        public IActionResult Create(InnerPageHeaderViewModel pageHeaderView)
        {
            if (ModelState.IsValid)
            {
                if (_IInnerNewPageHeaderQueries.CheckPageHeaderNameExists(pageHeaderView.PageHeaderName))
                {
                    _notificationService.DangerNotification("Message", "Header Name Entered already Exists.");
                    return View(pageHeaderView);
                }
                var currentdate = DateTime.Now;
                var user = HttpContext.Session.GetInt32(AllSessionKeys.UserId);

                var pageheaderModel = _mapper.Map<InnerPageHeaderModel>(pageHeaderView);
                pageheaderModel.CreatedOn = currentdate;
                pageheaderModel.InnerPageHeaderId = 0;
                pageheaderModel.PageHeaderDetails_EN = HttpUtility.HtmlDecode(pageHeaderView.PageHeaderDetailsEN);
                pageheaderModel.PageHeaderDetails_LL = HttpUtility.HtmlDecode(pageHeaderView.PageHeaderDetailsLL);
                pageheaderModel.CreatedBy = user;

                var result = _IInnerNewPageHeaderCommand.Add(pageheaderModel);
                if (result > 0)
                {
                    _notificationService.SuccessNotification("Message", $"Page Header Details Saved Successfully.");
                    return RedirectToAction("Index");
                }
            }

            return View(pageHeaderView);
        }

        [HttpGet]
        public IActionResult Edit(int? id)
        {
            if (id == null)
            {
                _notificationService.DangerNotification("Message", "Something went wrong please try again.");

                return RedirectToAction("Index");
            }
            var editmodel = _IInnerNewPageHeaderQueries.GetPageHeaderbyPageHeaderId(id.Value);
            if (editmodel == null)
            {
                _notificationService.DangerNotification("Message", "Something went wrong please try again.");

                return RedirectToAction("Index");
            }

            return View(editmodel);
        }


        [HttpPost]
        public IActionResult Edit(InnerEditPageHeaderViewModel editPage)
        {
            if (ModelState.IsValid)
            {
                var editmodel = _IInnerNewPageHeaderQueries.GetPageHeaderbyPageHeaderId(editPage.InnerPageHeaderId);
                if (editmodel.PageHeaderName == editPage.PageHeaderName)
                {
                    var pageheaderModel = _mapper.Map<InnerPageHeaderModel>(editPage);
                    var result = _IInnerNewPageHeaderCommand.Update(pageheaderModel);
                    if (result > 0)
                    {
                        _notificationService.SuccessNotification("Message", $"Page Header Details Updated Successfully.");
                        return RedirectToAction("Index");
                    }
                }
                else
                {
                    if (_IInnerNewPageHeaderQueries.CheckPageHeaderNameExists(editPage.PageHeaderName))
                    {
                        _notificationService.DangerNotification("Message", "Page header Name already Exits");
                    }
                    else
                    {
                        var pageheaderModel = _mapper.Map<InnerPageHeaderModel>(editPage);
                        var result = _IInnerNewPageHeaderCommand.Update(pageheaderModel);
                        if (result > 0)
                        {
                            _notificationService.SuccessNotification("Message", $"Page Header Details Updated Successfully.");
                            return RedirectToAction("Index");
                        }
                    }
                }
            }

            return View(editPage);
        }


        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult GridAllPagesHeader()
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
                var records = _IInnerNewPageHeaderQueries.ShowAllPageHeader(sortColumn, sortColumnDirection, searchValue);
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

        public JsonResult Deactivate(RequestDelete requestDelete)
        {
            try
            {
                if (requestDelete.Id == null)
                {
                    return Json(new { Result = "failed", Message = "Something Went Wrong" });
                }

                var data = _IInnerNewPageHeaderQueries.GetInnerPageHeader(requestDelete.Id.Value);
                var result = _IInnerNewPageHeaderCommand.Deactivate(data);
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

        public JsonResult SetDefaultHeader(RequestDefault requestDefault)
        {
            try
            {
                if (requestDefault.Id == null)
                {
                    return Json(new { Result = "failed", Message = "Something Went Wrong" });
                }
                var result = _IInnerNewPageHeaderCommand.SetDefaultHeader(requestDefault.Id);
                if (result)
                {
                    _notificationService.SuccessNotification("Message", "The Default Header Set successfully!");
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
