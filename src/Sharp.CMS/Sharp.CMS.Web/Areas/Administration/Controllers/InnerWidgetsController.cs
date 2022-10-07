using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Sharp.CMS.Common;
using Sharp.CMS.Data.InnerPages.Command;
using Sharp.CMS.Data.InnerPages.Queries;
using Sharp.CMS.Models.InnerPage;
using Sharp.CMS.Models.Page;
using Sharp.CMS.ViewModels.InnerPage;
using Sharp.CMS.ViewModels.Page;
using Sharp.CMS.Web.Filters;
using Sharp.CMS.Web.Notification;

namespace Sharp.CMS.Web.Areas.Administration.Controllers
{
    [Area("Administration")]
    [SessionTimeOut]
    public class InnerWidgetsController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IInnerWidgetsQueries _IInnerWidgetsQueries;
        private readonly INotificationService _notificationService;
        private readonly IInnerWidgetsCommand _iInnerWidgetsCommand;
        public InnerWidgetsController(IMapper mapper, 
            IInnerWidgetsQueries innerWidgetsQueries, 
            INotificationService notificationService,
            IInnerWidgetsCommand innerWidgetsCommand)
        {
            _mapper = mapper;
            _IInnerWidgetsQueries = innerWidgetsQueries;
            _notificationService = notificationService;
            _iInnerWidgetsCommand = innerWidgetsCommand;
        }


        [HttpGet]
        public IActionResult Create()
        {
            var pageheader = new InnerPageWidgetsViewModel();
            return View(pageheader);
        }

        [HttpPost]
        public IActionResult Create(InnerPageWidgetsViewModel pageWidgets)
        {
            if (ModelState.IsValid)
            {
                if (_IInnerWidgetsQueries.CheckPageWidgetNameExists(pageWidgets.PageWidgetName))
                {
                    _notificationService.DangerNotification("Message", "Footer Name Entered already Exists.");
                    return View(pageWidgets);
                }
                var currentdate = DateTime.Now;
                var user = HttpContext.Session.GetInt32(AllSessionKeys.UserId);

                var pageFooterModel = _mapper.Map<InnerPageWidgetsModel>(pageWidgets);
                pageFooterModel.CreatedOn = currentdate;
                pageFooterModel.InnerPageWidgetId = 0;
                pageFooterModel.PageWidgetDetails_EN = HttpUtility.HtmlDecode(pageWidgets.PageWidgetDetailsEN);
                pageFooterModel.PageWidgetDetails_LL = HttpUtility.HtmlDecode(pageWidgets.PageWidgetDetailsLL);
                pageFooterModel.CreatedBy = user;

                var result = _iInnerWidgetsCommand.Add(pageFooterModel);
                if (result > 0)
                {
                    _notificationService.SuccessNotification("Message", $"Inner Page Widgets Details Saved Successfully.");
                    return RedirectToAction("Index");
                }
            }

            return View(pageWidgets);
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult GridAllWidgets()
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
                var records = _IInnerWidgetsQueries.ShowAllPageWidget(sortColumn, sortColumnDirection, searchValue);
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
            var editmodel = _IInnerWidgetsQueries.GetPageWidgetbyPageWidgetId(id.Value);
            if (editmodel == null)
            {
                _notificationService.DangerNotification("Message", "Something went wrong please try again.");

                return RedirectToAction("Index");
            }

            return View(editmodel);
        }

        [HttpPost]
        public IActionResult Edit(InnerEditWidgetsViewModel pageWidgets)
        {
            if (ModelState.IsValid)
            {
                var editmodel = _IInnerWidgetsQueries.GetPageWidgetbyPageWidgetId(pageWidgets.InnerPageWidgetId);

                if (editmodel.PageWidgetName == pageWidgets.PageWidgetName)
                {


                    var currentdate = DateTime.Now;
                    var user = HttpContext.Session.GetInt32(AllSessionKeys.UserId);

                    var pageFooterModel = _mapper.Map<InnerPageWidgetsModel>(pageWidgets);
                    pageFooterModel.CreatedOn = currentdate;
                    pageFooterModel.InnerPageWidgetId = editmodel.InnerPageWidgetId;
                    pageFooterModel.PageWidgetDetails_EN = HttpUtility.HtmlDecode(pageWidgets.PageWidgetDetailsEN);
                    pageFooterModel.PageWidgetDetails_LL = HttpUtility.HtmlDecode(pageWidgets.PageWidgetDetailsLL);
                    pageFooterModel.CreatedBy = user;


                    var result = _iInnerWidgetsCommand.Update(pageFooterModel);
                    if (result > 0)
                    {
                        _notificationService.SuccessNotification("Message",
                            $"Page Widgets Details Updated Successfully.");
                        return RedirectToAction("Index");
                    }
                }
                else
                {
                    if (_IInnerWidgetsQueries.CheckPageWidgetNameExists(pageWidgets.PageWidgetName))
                    {
                        _notificationService.DangerNotification("Message", "Widgets Name Entered already Exists.");
                        return View(pageWidgets);
                    }
                    else
                    {
                        var currentdate = DateTime.Now;
                        var user = HttpContext.Session.GetInt32(AllSessionKeys.UserId);

                        var pageFooterModel = _mapper.Map<InnerPageWidgetsModel>(pageWidgets);
                        pageFooterModel.CreatedOn = currentdate;
                        pageFooterModel.InnerPageWidgetId = editmodel.InnerPageWidgetId;
                        pageFooterModel.PageWidgetDetails_EN = HttpUtility.HtmlDecode(pageWidgets.PageWidgetDetailsEN);
                        pageFooterModel.PageWidgetDetails_LL = HttpUtility.HtmlDecode(pageWidgets.PageWidgetDetailsLL);
                        pageFooterModel.CreatedBy = user;


                        var result = _iInnerWidgetsCommand.Update(pageFooterModel);
                        if (result > 0)
                        {
                            _notificationService.SuccessNotification("Message",
                                $"Inner Page Widgets Details Updated Successfully.");
                            return RedirectToAction("Index");
                        }
                    }


                }
            }

            return View(pageWidgets);
        }

        public JsonResult Deactivate(RequestDelete requestDelete)
        {
            try
            {
                if (requestDelete.Id == null)
                {
                    return Json(new { Result = "failed", Message = "Something Went Wrong" });
                }

                var data = _IInnerWidgetsQueries.GetPageWidget(requestDelete.Id.Value);
                var result = _iInnerWidgetsCommand.Deactivate(data);
                if (result)
                {
                    _notificationService.SuccessNotification("Message", "The Widget Deactivated successfully!");
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
