using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
using Sharp.CMS.Models.UserMaster;
using Sharp.CMS.ViewModels.UserMaster;

namespace Sharp.CMS.Data.UserMaster.Queries
{
    public interface IUserMasterQueries
    {
        UserMasterModel GetUserById(long? userId);
        bool CheckUsernameExists(string username);
        UserMasterModel GetUserByUsername(string username);
        bool CheckEmailIdExists(string emailid);
        bool CheckMobileNoExists(string mobileno);
        List<SelectListItem> GetListofAdmin();
        UserMasterModel GetUserdetailsbyEmailId(string emailid);
        CommonUserDetailsViewModel GetCommonUserDetailsbyUserName(string username);
        IQueryable<UserMasterGrid> ShowAllUsers(string sortColumn, string sortColumnDir, string search);
        EditUserViewModel GetUserForEditByUserId(long? userId);
        UserMasterModel GetUserDetailsbyUserId(long? userId);
    }
}