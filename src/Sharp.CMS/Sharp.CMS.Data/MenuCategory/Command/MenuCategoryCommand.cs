
using Sharp.CMS.Models.MenuCategory;
using Microsoft.EntityFrameworkCore;
using Sharp.CMS.Data.Data;


namespace Sharp.CMS.Data.MenuCategory.Command
{
    public class MenuCategoryCommand : IMenuCategoryCommand
    {
        private readonly SharpContext _sharpContext;
        public MenuCategoryCommand(SharpContext SharpContext)
        {
            _sharpContext = SharpContext;
        }
        public int Add(MenuCategoryModel category)
        {
            _sharpContext.MenuCategorys.Add(category);
            return _sharpContext.SaveChanges();
        }

        public int Delete(MenuCategoryModel category)
        {
            _sharpContext.Entry(category).State = EntityState.Deleted;
            return _sharpContext.SaveChanges();
        }

        public int Update(MenuCategoryModel category)
        {
            _sharpContext.Entry(category).State = EntityState.Modified;
            return _sharpContext.SaveChanges();
        }
    }
}