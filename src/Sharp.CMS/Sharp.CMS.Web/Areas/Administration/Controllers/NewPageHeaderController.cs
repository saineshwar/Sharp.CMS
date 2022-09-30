using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Sharp.CMS.Common;
using Sharp.CMS.Data.CommonMasters.Queries;
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
    public class NewPageHeaderController : Controller
    {
        private readonly IMapper _mapper;
        private readonly INewPageHeaderCommand _iNewPageHeaderCommand;
        private readonly INewPageHeaderQueries _iNewPageHeaderQueries;
        private readonly INotificationService _notificationService;
        private ICommonMastersQueries _commonMastersQueries;
        public NewPageHeaderController(
            INewPageHeaderCommand newPageHeaderCommand,
            IMapper mapper,
            INewPageHeaderQueries newPageHeaderQueries, INotificationService notificationService, ICommonMastersQueries commonMastersQueries)
        {
            _iNewPageHeaderCommand = newPageHeaderCommand;
            _mapper = mapper;
            _iNewPageHeaderQueries = newPageHeaderQueries;
            _notificationService = notificationService;
            _commonMastersQueries = commonMastersQueries;
        }

        [HttpGet]
        public IActionResult Create()
        {
            var pageheader = new PageHeaderViewModel();
            return View(pageheader);
        }


        [HttpPost]
        public IActionResult Create(PageHeaderViewModel pageHeaderView)
        {
            if (ModelState.IsValid)
            {
                if (_iNewPageHeaderQueries.CheckPageHeaderNameExists(pageHeaderView.PageHeaderName))
                {
                    _notificationService.DangerNotification("Message", "Header Name Entered already Exists.");
                    return View(pageHeaderView);
                }
                var currentdate = DateTime.Now;
                var user = HttpContext.Session.GetInt32(AllSessionKeys.UserId);

                var pageheaderModel = _mapper.Map<PageHeaderModel>(pageHeaderView);
                pageheaderModel.CreatedOn = currentdate;
                pageheaderModel.PageHeaderId = 0;
                pageheaderModel.PageHeaderDetails_EN = HttpUtility.HtmlDecode(pageHeaderView.PageHeaderDetailsEN);
                pageheaderModel.PageHeaderDetails_LL = HttpUtility.HtmlDecode(pageHeaderView.PageHeaderDetailsLL);
                pageheaderModel.CreatedBy = user;

                var result = _iNewPageHeaderCommand.Add(pageheaderModel);
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
            var editmodel = _iNewPageHeaderQueries.GetPageHeaderbyPageHeaderId(id.Value);
            if (editmodel == null)
            {
                _notificationService.DangerNotification("Message", "Something went wrong please try again.");

                return RedirectToAction("Index");
            }

            return View(editmodel);
        }


        [HttpPost]
        public IActionResult Edit(EditPageHeaderViewModel editPage)
        {
            if (ModelState.IsValid)
            {
                var editmodel = _iNewPageHeaderQueries.GetPageHeaderbyPageHeaderId(editPage.PageHeaderId);
                if (editmodel.PageHeaderName == editPage.PageHeaderName)
                {
                    var pageheaderModel = _mapper.Map<PageHeaderModel>(editPage);
                    var result = _iNewPageHeaderCommand.Update(pageheaderModel);
                    if (result > 0)
                    {
                        _notificationService.SuccessNotification("Message", $"Page Header Details Updated Successfully.");
                        return RedirectToAction("Index");
                    }
                }
                else
                {
                    if (_iNewPageHeaderQueries.CheckPageHeaderNameExists(editPage.PageHeaderName))
                    {
                        _notificationService.DangerNotification("Message", "Page header Name already Exits");
                    }
                    else
                    {
                        var pageheaderModel = _mapper.Map<PageHeaderModel>(editPage);
                        var result = _iNewPageHeaderCommand.Update(pageheaderModel);
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
                var records = _iNewPageHeaderQueries.ShowAllPageHeader(sortColumn, sortColumnDirection, searchValue);
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
