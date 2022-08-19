
using Sharp.CMS.Models.MenuMaster;

namespace Sharp.CMS.Data.MenuMaster.Command
{
    public interface IMenuMasterCommand
    {
        int Add(MenuMasterModel menuMaster);
        int Delete(MenuMasterModel menuMaster);
        int Update(MenuMasterModel menuMaster);
    }
}