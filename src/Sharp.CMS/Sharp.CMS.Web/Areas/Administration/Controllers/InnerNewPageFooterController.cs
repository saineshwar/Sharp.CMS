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
using Sharp.CMS.Web.Filters;
using Sharp.CMS.Web.Notification;

namespace Sharp.CMS.Web.Areas.Administration.Controllers
{
    [Area("Administration")]
    [SessionTimeOut]
    public class InnerNewPageFooterController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IInnerNewPageFooterQueries _IInnerNewPageFooterQueries;
        private readonly INotificationService _notificationService;
        private readonly IInnerNewPageFooterCommand _IInnerNewPageFooterCommand;

        public InnerNewPageFooterController(IMapper mapper, 
            IInnerNewPageFooterQueries innerNewPageFooterQueries, 
            INotificationService notificationService, 
            IInnerNewPageFooterCommand innerNewPageFooterCommand)
        {
            _mapper = mapper;
            _IInnerNewPageFooterQueries = innerNewPageFooterQueries;
            _notificationService = notificationService;
            _IInnerNewPageFooterCommand = innerNewPageFooterCommand;
        }

        [HttpGet]
        public IActionResult Create()
        {
            var pageheader = new InnerPageFooterViewModel();
            return View(pageheader);
        }


        [HttpPost]
        public IActionResult Create(InnerPageFooterViewModel pageFooter)
        {
            if (ModelState.IsValid)
            {
                if (_IInnerNewPageFooterQueries.CheckPageFooterNameExists(pageFooter.PageFooterName))
                {
                    _notificationService.DangerNotification("Message", "Footer Name Entered already Exists.");
                    return View(pageFooter);
                }
                var currentdate = DateTime.Now;
                var user = HttpContext.Session.GetInt32(AllSessionKeys.UserId);

                var pageFooterModel = _mapper.Map<InnerPageFooterModel>(pageFooter);
                pageFooterModel.CreatedOn = currentdate;
                pageFooterModel.InnerPageFooterId = 0;
                pageFooterModel.PageFooterDetails_EN = HttpUtility.HtmlDecode(pageFooter.PageFooterDetailsEN);
                pageFooterModel.PageFooterDetails_LL = HttpUtility.HtmlDecode(pageFooter.PageFooterDetailsLL);
                pageFooterModel.CreatedBy = user;

                var result = _IInnerNewPageFooterCommand.Add(pageFooterModel);
                if (result > 0)
                {
                    _notificationService.SuccessNotification("Message", $"Page Footer Details Saved Successfully.");
                    return RedirectToAction("Index");
                }
            }

            return View(pageFooter);
        }

        [HttpGet]
        public IActionResult Edit(int? id)
        {
            if (id == null)
            {
                _notificationService.DangerNotification("Message", "Something went wrong please try again.");

                return RedirectToAction("Index");
            }
            var editmodel = _IInnerNewPageFooterQueries.GetPageFooterbyPageFooterId(id.Value);
            if (editmodel == null)
            {
                _notificationService.DangerNotification("Message", "Something went wrong please try again.");

                return RedirectToAction("Index");
            }

            return View(editmodel);
        }

        [HttpPost]
        public IActionResult Edit(InnerEditPageFooterViewModel editPage)
        {
            if (ModelState.IsValid)
            {
                var editmodel = _IInnerNewPageFooterQueries.GetPageFooterbyPageFooterId(editPage.InnerPageFooterId);
                if (editmodel.PageFooterName == editPage.PageFooterName)
                {
                    var pagefooterModel = _mapper.Map<InnerPageFooterModel>(editPage);
                    var result = _IInnerNewPageFooterCommand.Update(pagefooterModel);
                    if (result > 0)
                    {
                        _notificationService.SuccessNotification("Message", $"Page Footer Details Updated Successfully.");
                        return RedirectToAction("Index");
                    }
                }
                else
                {
                    if (_IInnerNewPageFooterQueries.CheckPageFooterNameExists(editPage.PageFooterName))
                    {
                        _notificationService.DangerNotification("Message", "Page footer Name already Exits");
                    }
                    else
                    {
                        var pagefooterModel = _mapper.Map<InnerPageFooterModel>(editPage);
                        var result = _IInnerNewPageFooterCommand.Update(pagefooterModel);
                        if (result > 0)
                        {
                            _notificationService.SuccessNotification("Message", $"Page Footer Details Updated Successfully.");
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
        public IActionResult GridAllPageFooter()
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
                var records = _IInnerNewPageFooterQueries.ShowAllPageFooter(sortColumn, sortColumnDirection, searchValue);
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

        public JsonResult Deactivate(RequestDeleteInnerFooterPage requestDelete)
        {
            try
            {
                if (requestDelete.InnerPageFooterId == null)
                {
                    return Json(new { Result = "failed", Message = "Something Went Wrong" });
                }

                var data = _IInnerNewPageFooterQueries.GetInnerPageFooterbyPageFooterId(requestDelete.InnerPageFooterId.Value);
                var result = _IInnerNewPageFooterCommand.Deactivate(data);
                if (result >0 )
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
