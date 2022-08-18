using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
using Sharp.CMS.Models.RoleMaster;
using Sharp.CMS.ViewModels.RoleMaster;

namespace Sharp.CMS.Data.RoleMaster.Queries
{
    public interface IRoleQueries
    {
        bool CheckRoleNameExists(string roleName);
        IQueryable<RoleMasterGrid> ShowAllRoleMaster(string sortColumn, string sortColumnDir, string search);
        RoleMasterModel GetRoleMasterByroleId(int? roleId);
        EditRoleMasterViewModel GetRoleMasterForEditByroleId(int? roleId);
        List<SelectListItem> ListofRoles();
        List<SelectListItem> GetAllActiveRoles();
    }
}