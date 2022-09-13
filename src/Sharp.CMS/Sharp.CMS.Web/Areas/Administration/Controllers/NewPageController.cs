﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc.Rendering;
using Sharp.CMS.Data.NewPage.Command;
using Sharp.CMS.Data.NewPage.Queries;
using Sharp.CMS.Models.Page;
using Sharp.CMS.ViewModels.MenuCategory;
using Sharp.CMS.ViewModels.Page;
using Sharp.CMS.Web.Filters;

namespace Sharp.CMS.Web.Areas.Administration.Controllers
{
    [Area("Administration")]
    [SessionTimeOut]
    public class NewPageController : Controller
    {
        private readonly IMapper _mapper;
        private readonly INewPageCommand _iNewPageCommand;
        private readonly INewPageQueries _iNewPageQueries;
        public NewPageController(IMapper mapper, INewPageCommand newPageCommand, INewPageQueries newPageQueries)
        {
            _mapper = mapper;
            _iNewPageCommand = newPageCommand;
            _iNewPageQueries = newPageQueries;
        }

        [HttpGet]
        public IActionResult Create()
        {
            var pageViewModel = new PageViewModel();
            return View(pageViewModel);
        }

        [HttpPost]
        public IActionResult Create(PageViewModel pageViewModel)
        {
            if (ModelState.IsValid)
            {
                var pageModel = _mapper.Map<PageModel>(pageViewModel);
                pageModel.CreatedOn = DateTime.Now;
                pageModel.PageId = 0;

                if (!string.IsNullOrEmpty(pageViewModel.Permalink))
                {
                    pageViewModel.Alias = "";
                }

                if (!string.IsNullOrEmpty(pageViewModel.Alias))
                {
                    pageViewModel.Permalink = "";
                }

                var result = _iNewPageCommand.Add(pageModel);
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



    }
}
