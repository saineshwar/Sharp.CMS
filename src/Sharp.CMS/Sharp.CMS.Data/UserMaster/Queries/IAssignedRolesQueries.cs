using Sharp.CMS.Models.UserMaster;

namespace Sharp.CMS.Data.UserMaster.Queries
{
    public interface IAssignedRolesQueries
    {
        AssignedRolesModel GetAssignedRolesDetailsbyUserId(long? userId);
    }
}