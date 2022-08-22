using System.Collections.Generic;
using Sharp.CMS.ViewModels.MenuMaster;

namespace Sharp.CMS.Data.MenuOrdering.Command
{
    public interface IOrderingCommand
    {
        void UpdateMenuCategoryOrder(List<MenuCategoryStoringOrder> menuCategorylist);
        void UpdateMenuOrder(List<MenuStoringOrder> menuStoringOrder);
    }
}