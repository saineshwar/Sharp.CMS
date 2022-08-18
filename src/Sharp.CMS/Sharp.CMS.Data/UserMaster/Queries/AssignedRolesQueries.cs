using System.Linq;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.UserMaster;

namespace Sharp.CMS.Data.UserMaster.Queries
{
    public class AssignedRolesQueries : IAssignedRolesQueries
    {
        private readonly SharpContext _sharpContext;
        public AssignedRolesQueries(SharpContext sharpContext)
        {
            _sharpContext = sharpContext;
        }
        public AssignedRolesModel GetAssignedRolesDetailsbyUserId(long? userId)
        {
            var assignedRoles = (from tempAssignedRole in _sharpContext.AssignedRoles
                where tempAssignedRole.UserId == userId
                select tempAssignedRole).FirstOrDefault();
            return assignedRoles;
        }
    }
}