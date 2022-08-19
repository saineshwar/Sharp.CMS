using Microsoft.AspNetCore.Mvc;

namespace Sharp.CMS.Web.Views.Shared.Components.Sidebar
{
    public class SidebarViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke() => View();
    }
}