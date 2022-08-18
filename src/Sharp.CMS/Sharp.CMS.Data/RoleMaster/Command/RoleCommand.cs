using Microsoft.EntityFrameworkCore;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.RoleMaster;

namespace Sharp.CMS.Data.RoleMaster.Command
{
    public class RoleCommand : IRoleCommand
    {
        private readonly SharpContext _sharpContext;
        public RoleCommand(SharpContext bugPointContext)
        {
            _sharpContext = bugPointContext;
        }

        public int Delete(RoleMasterModel roleMaster)
        {
            _sharpContext.Entry(roleMaster).State = EntityState.Deleted;
            return _sharpContext.SaveChanges();
        }

        public int Add(RoleMasterModel roleMaster)
        {
            _sharpContext.RoleMasters.Add(roleMaster);
            return _sharpContext.SaveChanges();
        }

        public int Update(RoleMasterModel roleMaster)
        {
            _sharpContext.Entry(roleMaster).State = EntityState.Modified;
            return _sharpContext.SaveChanges();
        }
    }
}