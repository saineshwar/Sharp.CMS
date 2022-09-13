using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using AutoMapper;
using Sharp.CMS.Data.NewPage.Command;
using Sharp.CMS.Models.Page;
using Sharp.CMS.ViewModels.Page;
using Sharp.CMS.Web.Filters;

namespace Sharp.CMS.Web.Areas.Administration.Controllers
{
    [Area("Administration")]
    [SessionTimeOut]
    public class NewPageHeaderController : Controller
    {
        private readonly IMapper _mapper;
        private readonly INewPageHeaderCommand _iNewPageHeaderCommand;
        public NewPageHeaderController(INewPageHeaderCommand newPageHeaderCommand, IMapper mapper)
        {
            _iNewPageHeaderCommand = newPageHeaderCommand;
            _mapper = mapper;
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
                var pageheaderModel = _mapper.Map<PageHeaderModel>(pageHeaderView);
                pageheaderModel.CreatedOn = DateTime.Now;
                pageheaderModel.PageHeaderId = 0;
                pageheaderModel.PageHeaderDetails = HttpUtility.HtmlDecode(pageHeaderView.PageHeaderDetails);

                var result = _iNewPageHeaderCommand.Add(pageheaderModel);
            }

            return View(pageHeaderView);
        }
    }
}
