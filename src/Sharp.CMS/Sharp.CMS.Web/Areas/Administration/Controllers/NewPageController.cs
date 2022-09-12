using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc.Rendering;
using Sharp.CMS.Data.NewPage.Command;
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
        public NewPageController(IMapper mapper, INewPageCommand newPageCommand)
        {
            _mapper = mapper;
            _iNewPageCommand = newPageCommand;
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
            var pageModel = _mapper.Map<PageModel>(pageViewModel);
            pageModel.CreatedOn = DateTime.Now;
            pageModel.PageId = 0;

          

            if (!string.IsNullOrEmpty(pageViewModel.Permalink))
            {
                pageViewModel.Alias = "";
            }

            var result = _iNewPageCommand.Add(pageModel);


            return View(pageViewModel);
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
    }
}
