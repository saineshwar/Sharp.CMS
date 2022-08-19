using Sharp.CMS.Models.MenuCategory;

namespace Sharp.CMS.Data.MenuCategory.Command
{
    public interface IMenuCategoryCommand
    {
        int Add(MenuCategoryModel category);
        int Update(MenuCategoryModel category);
        int Delete(MenuCategoryModel category);
    }
}