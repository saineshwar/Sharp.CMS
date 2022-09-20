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
using Sharp.CMS.ViewModels.Page;
using Sharp.CMS.Web.Filters;
using Sharp.CMS.Web.Notification;

namespace Sharp.CMS.Web.Areas.Administration.Controllers
{
    [Area("Administration")]
    [SessionTimeOut]
    public class NewPageFooterController : Controller
    {
        private readonly IMapper _mapper;
        private readonly INewPageFooterQueries _newPageFooterQueries;
        private readonly INotificationService _notificationService;
        private readonly INewPageFooterCommand _newPageFooterCommand;
        public NewPageFooterController(INewPageFooterQueries newPageFooterQueries, INotificationService notificationService, IMapper mapper, INewPageFooterCommand newPageFooterCommand)
        {
            _newPageFooterQueries = newPageFooterQueries;
            _notificationService = notificationService;
            _mapper = mapper;
            _newPageFooterCommand = newPageFooterCommand;
        }

        [HttpGet]
        public IActionResult Create()
        {
            var pageheader = new PageFooterViewModel();
            return View(pageheader);
        }


        [HttpPost]
        public IActionResult Create(PageFooterViewModel pageFooter)
        {
            if (ModelState.IsValid)
            {
                if (_newPageFooterQueries.CheckPageFooterNameExists(pageFooter.PageFooterName))
                {
                    _notificationService.DangerNotification("Message", "Footer Name Entered already Exists.");
                    return View(pageFooter);
                }
                var currentdate = DateTime.Now;
                var user = HttpContext.Session.GetInt32(AllSessionKeys.UserId);

                var pageFooterModel = _mapper.Map<PageFooterModel>(pageFooter);
                pageFooterModel.CreatedOn = currentdate;
                pageFooterModel.PageFooterId = 0;
                pageFooterModel.PageFooterDetails_EN = HttpUtility.HtmlDecode(pageFooter.PageFooterDetailsEN);
                pageFooterModel.PageFooterDetails_LL = HttpUtility.HtmlDecode(pageFooter.PageFooterDetailsLL);
                pageFooterModel.CreatedBy = user;

                var result = _newPageFooterCommand.Add(pageFooterModel);
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
            var editmodel = _newPageFooterQueries.GetPageFooterbyPageFooterId(id.Value);
            if (editmodel == null)
            {
                _notificationService.DangerNotification("Message", "Something went wrong please try again.");

                return RedirectToAction("Index");
            }

            return View(editmodel);
        }


        [HttpPost]
        public IActionResult Edit(EditPageFooterViewModel editPage)
        {
            if (ModelState.IsValid)
            {
                var editmodel = _newPageFooterQueries.GetPageFooterbyPageFooterId(editPage.PageFooterId);
                if (editmodel.PageFooterName == editPage.PageFooterName)
                {
                    var pagefooterModel = _mapper.Map<PageFooterModel>(editPage);
                    var result = _newPageFooterCommand.Update(pagefooterModel);
                    if (result > 0)
                    {
                        _notificationService.SuccessNotification("Message", $"Page Footer Details Updated Successfully.");
                        return RedirectToAction("Index");
                    }
                }
                else
                {
                    if (_newPageFooterQueries.CheckPageFooterNameExists(editPage.PageFooterName))
                    {
                        _notificationService.DangerNotification("Message", "Page footer Name already Exits");
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
                var records = _newPageFooterQueries.ShowAllPageFooter(sortColumn, sortColumnDirection, searchValue);
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
    }
}
