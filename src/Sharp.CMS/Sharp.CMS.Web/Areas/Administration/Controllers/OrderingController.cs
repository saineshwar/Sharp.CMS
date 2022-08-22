using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sharp.CMS.Data.MenuCategory.Queries;
using Sharp.CMS.Data.MenuMaster.Queries;
using Sharp.CMS.Data.MenuOrdering.Command;
using Sharp.CMS.Data.RoleMaster.Queries;
using Sharp.CMS.ViewModels.MenuCategory;
using Sharp.CMS.ViewModels.MenuMaster;
using Sharp.CMS.Web.Filters;

namespace Sharp.CMS.Web.Areas.Administration.Controllers
{
    [Area("Administration")]
    [SessionTimeOut]
    [AuthorizeSuperAdmin]
    public class OrderingController : Controller
    {
        private readonly IRoleQueries _roleQueries;
        private readonly IMenuCategoryQueries _iMenuCategoryQueries;
        private readonly IOrderingCommand _orderingCommand;
        private readonly IMenuMasterQueries _menuMasterQueries;

        public OrderingController(
            IRoleQueries roleQueries,
            IMenuCategoryQueries menuCategoryQueries,
            IOrderingCommand orderingCommand,
            IMenuMasterQueries menuMasterQueries
          )
        {
            _roleQueries = roleQueries;
            _iMenuCategoryQueries = menuCategoryQueries;
            _orderingCommand = orderingCommand;
            _menuMasterQueries = menuMasterQueries;
        }


        #region MenuCategory
        [HttpGet]
        public IActionResult MenuCategory()
        {
            return View();
        }

        [HttpPost]
        public IActionResult MenuCategory(RequestMenuCategoryOrderVM request)
        {
            int preference = 1;
            var listofStoringOrders = new List<MenuCategoryStoringOrder>();
            if (request.SelectedOrder != null)
            {
                foreach (int menuId in request.SelectedOrder)
                {
                    listofStoringOrders.Add(new MenuCategoryStoringOrder()
                    {
                        RoleId = request.RoleId,
                        SortingOrder = preference,
                        MenuCategoryId = menuId
                    });
                    preference += 1;
                }
            }

            _orderingCommand.UpdateMenuCategoryOrder(listofStoringOrders);

            return View();
        }

        public JsonResult GetAllRoles()
        {
            return Json(_roleQueries.ListofRoles());
        }

        public JsonResult GetAllMenuCategorybyRoleId(int roleId)
        {
            return Json(_iMenuCategoryQueries.ListofMenubyRoleCategoryId(roleId));
        }
        #endregion

        #region MainMenu

        [HttpGet]
        public IActionResult MainMenu()
        {
            return View();
        }

        [HttpPost]
        public IActionResult MainMenu(RequestMenuMasterOrderVM request)
        {
            int preference = 1;
            var listofStoringOrders = new List<MenuStoringOrder>();
            if (request.SelectedOrder != null)
            {
                foreach (int menuId in request.SelectedOrder)
                {
                    listofStoringOrders.Add(new MenuStoringOrder()
                    {
                        RoleId = request.RoleId,
                        MenuId = menuId,
                        SortingOrder = preference
                    });
                    preference += 1;
                }
            }

            _orderingCommand.UpdateMenuOrder(listofStoringOrders);
            return View();
        }

        public JsonResult GetCategorybyRoleId(int roleId)
        {
            return Json(_iMenuCategoryQueries.GetCategorybyRoleId(roleId));
        }

        public JsonResult GetAllMenubyRoleId(RequestMenu requestMenu)
        {
            return Json(_menuMasterQueries.GetListofMenu(requestMenu.RoleId, requestMenu.MenuCategoryId));
        }

        public JsonResult GetAllMenubyRoleIdSelectListItem(int roleId, int menuCategoryId)
        {
            return Json(_menuMasterQueries.ListofMenubyRoleIdSelectListItem(roleId, menuCategoryId));
        }

        #endregion



    }
}
