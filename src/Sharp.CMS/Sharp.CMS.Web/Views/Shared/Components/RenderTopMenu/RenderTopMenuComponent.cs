using Microsoft.AspNetCore.Mvc;

namespace Sharp.CMS.Web.Views.Shared.Components.RenderTopMenu
{
    public class RenderTopMenuComponent : ViewComponent
    {
        public IViewComponentResult Invoke()
        {
            return View();
        }
    }
}