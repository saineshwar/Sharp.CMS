using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Sharp.CMS.Common;
using Sharp.CMS.Data.NewPage.Command;
using Sharp.CMS.Data.NewPage.Queries;
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
    public class WidgetsController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IWidgetsCommand _iWidgetsCommand;
        private readonly IWidgetsQueries _iWidgetsQueries;
        private readonly INotificationService _notificationService;
        public WidgetsController(IMapper mapper, IWidgetsCommand widgetsCommand, IWidgetsQueries widgetsQueries, INotificationService notificationService)
        {
            _mapper = mapper;
            _iWidgetsCommand = widgetsCommand;
            _iWidgetsQueries = widgetsQueries;
            _notificationService = notificationService;
        }

        [HttpGet]
        public IActionResult Create()
        {
            var pageheader = new PageWidgetsViewModel();
            return View(pageheader);
        }


        [HttpPost]
        public IActionResult Create(PageWidgetsViewModel pageWidgets)
        {
            if (ModelState.IsValid)
            {
                if (_iWidgetsQueries.CheckPageWidgetNameExists(pageWidgets.PageWidgetName))
                {
                    _notificationService.DangerNotification("Message", "Footer Name Entered already Exists.");
                    return View(pageWidgets);
                }
                var currentdate = DateTime.Now;
                var user = HttpContext.Session.GetInt32(AllSessionKeys.UserId);

                var pageFooterModel = _mapper.Map<PageWidgetsModel>(pageWidgets);
                pageFooterModel.CreatedOn = currentdate;
                pageFooterModel.PageWidgetId = 0;
                pageFooterModel.PageWidgetDetails_EN = HttpUtility.HtmlDecode(pageWidgets.PageWidgetDetailsEN);
                pageFooterModel.PageWidgetDetails_LL = HttpUtility.HtmlDecode(pageWidgets.PageWidgetDetailsLL);
                pageFooterModel.CreatedBy = user;

                var result = _iWidgetsCommand.Add(pageFooterModel);
                if (result > 0)
                {
                    _notificationService.SuccessNotification("Message", $"Page Widgets Details Saved Successfully.");
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
                var records = _iWidgetsQueries.ShowAllPageWidget(sortColumn, sortColumnDirection, searchValue);
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
            var editmodel = _iWidgetsQueries.GetPageWidgetbyPageWidgetId(id.Value);
            if (editmodel == null)
            {
                _notificationService.DangerNotification("Message", "Something went wrong please try again.");

                return RedirectToAction("Index");
            }

            return View(editmodel);
        }

        [HttpPost]
        public IActionResult Edit(EditWidgetsViewModel pageWidgets)
        {
            if (ModelState.IsValid)
            {
                var editmodel = _iWidgetsQueries.GetPageWidgetbyPageWidgetId(pageWidgets.PageWidgetId);

                if (editmodel.PageWidgetName == pageWidgets.PageWidgetName)
                {
                   

                    var currentdate = DateTime.Now;
                    var user = HttpContext.Session.GetInt32(AllSessionKeys.UserId);

                    var pageFooterModel = _mapper.Map<PageWidgetsModel>(pageWidgets);
                    pageFooterModel.CreatedOn = currentdate;
                    pageFooterModel.PageWidgetId = editmodel.PageWidgetId;
                    pageFooterModel.PageWidgetDetails_EN = HttpUtility.HtmlDecode(pageWidgets.PageWidgetDetailsEN);
                    pageFooterModel.PageWidgetDetails_LL = HttpUtility.HtmlDecode(pageWidgets.PageWidgetDetailsLL);
                    pageFooterModel.CreatedBy = user;
            

                    var result = _iWidgetsCommand.Update(pageFooterModel);
                    if (result > 0)
                    {
                        _notificationService.SuccessNotification("Message",
                            $"Page Widgets Details Updated Successfully.");
                        return RedirectToAction("Index");
                    }
                }
                else
                {
                    if (_iWidgetsQueries.CheckPageWidgetNameExists(pageWidgets.PageWidgetName))
                    {
                        _notificationService.DangerNotification("Message", "Widgets Name Entered already Exists.");
                        return View(pageWidgets);
                    }
                    else
                    {
                        var currentdate = DateTime.Now;
                        var user = HttpContext.Session.GetInt32(AllSessionKeys.UserId);

                        var pageFooterModel = _mapper.Map<PageWidgetsModel>(pageWidgets);
                        pageFooterModel.CreatedOn = currentdate;
                        pageFooterModel.PageWidgetId = editmodel.PageWidgetId;
                        pageFooterModel.PageWidgetDetails_EN = HttpUtility.HtmlDecode(pageWidgets.PageWidgetDetailsEN);
                        pageFooterModel.PageWidgetDetails_LL = HttpUtility.HtmlDecode(pageWidgets.PageWidgetDetailsLL);
                        pageFooterModel.CreatedBy = user;


                        var result = _iWidgetsCommand.Update(pageFooterModel);
                        if (result > 0)
                        {
                            _notificationService.SuccessNotification("Message",
                                $"Page Widgets Details Updated Successfully.");
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

                var data = _iWidgetsQueries.GetPageWidget(requestDelete.Id.Value);
                var result = _iWidgetsCommand.Deactivate(data);
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
