﻿using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
using Sharp.CMS.Models.MenuMaster;
using Sharp.CMS.ViewModels.MenuMaster;

namespace Sharp.CMS.Data.MenuMaster.Queries
{
    public interface IMenuMasterQueries
    {
        bool CheckMenuNameExists(string menuName);
        bool CheckMenuExists(string menuName, int? roleId, int? categoryId);
        IQueryable<MenuMasterGrid> ShowAllMenus(string sortColumn, string sortColumnDir, string search);
        EditMenuMasterViewModel GetMenuByMenuId(int? menuId);
        MenuMasterModel GetMenuMasterByMenuId(int? menuId);
        bool EditValidationCheck(int? menuId, EditMenuMasterViewModel editMenu);
        List<SelectListItem> ListofMenusbyRoleId(RequestMenus requestMenus);
        List<MenuMasterModel> GetMenuByRoleId(int? roleId, int? menuCategoryId);
        List<MenuMasterOrderingVm> GetListofMenu(int roleId, int menuCategoryId);
        List<SelectListItem> ListofMenubyRoleIdSelectListItem(int roleId, int menuCategoryId);
    }
}