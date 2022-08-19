
using Microsoft.EntityFrameworkCore;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Data.MenuMaster.Command;
using Sharp.CMS.Models.MenuMaster;

namespace Sharp.CMS.Data.MenuMaster.Command
{
    public class MenuMasterCommand : IMenuMasterCommand
    {
        private readonly SharpContext _sharpContext;
        public MenuMasterCommand(SharpContext sharpContext)
        {
            _sharpContext = sharpContext;
        }

        public int Add(MenuMasterModel menuMaster)
        {
            _sharpContext.MenuMasters.Add(menuMaster);
            return _sharpContext.SaveChanges();
        }

        public int Delete(MenuMasterModel menuMaster)
        {
            _sharpContext.Entry(menuMaster).State = EntityState.Deleted;
            return _sharpContext.SaveChanges();
        }

        public int Update(MenuMasterModel menuMaster)
        {
            _sharpContext.Entry(menuMaster).State = EntityState.Modified;
            return _sharpContext.SaveChanges();
        }
    }
}