using Sharp.CMS.Models.UserMaster;

namespace Sharp.CMS.Data.UserMaster.Command
{
    public interface IUserMasterCommand
    {
        long? AddUser(UserMasterModel usermaster, int? roleId);
        string UpdateUser(UserMasterModel usermaster, AssignedRolesModel assignedRoles);
        bool UpdatePasswordandHistory(int? userId, string passwordHash, string processType);
        void DeleteUser(int? userId);
        string ChangeUserStatus(UserMasterModel usermaster);
        string UpdatePassword(string password, int? userId);
        bool UpdateIsFirstLoginStatus(int? userId);
    }
}