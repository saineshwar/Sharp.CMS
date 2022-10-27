using Microsoft.AspNetCore.Mvc;
using Sharp.CMS.Data.RenderingPages.Queries;

namespace Sharp.CMS.Web.Views.Shared.Components.RenderBottomMenu
{
    public class RenderBottomMenuViewComponent : ViewComponent
    {
        private readonly IRenderingMenus _iRenderingMenus;
        public RenderBottomMenuViewComponent(IRenderingMenus renderingMenus)
        {
            _iRenderingMenus = renderingMenus;
        }

        public IViewComponentResult Invoke()
        {
            var parentList = _iRenderingMenus.GetParentMenus();
            return View(parentList);
        }
    }
}