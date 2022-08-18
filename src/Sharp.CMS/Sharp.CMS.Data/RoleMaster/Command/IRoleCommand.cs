using Sharp.CMS.Models.RoleMaster;

namespace Sharp.CMS.Data.RoleMaster.Command
{
    public interface IRoleCommand
    {
        int Delete(RoleMasterModel roleMaster);
        int Add(RoleMasterModel roleMaster);
        int Update(RoleMasterModel roleMaster);
    }
}