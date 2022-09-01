using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc.Rendering;
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
        public NewPageController(IMapper mapper)
        {
            _mapper = mapper;
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
            return View();
        }

        //public IActionResult GetCategory(RequestForMenuCategory requestCategory)
        //{
        //    var listofCategory = _menuCategoryQueries.GetCategorybyRoleId(requestCategory.RoleId);
        //    return Json(listofCategory);
        //}
    }
}
