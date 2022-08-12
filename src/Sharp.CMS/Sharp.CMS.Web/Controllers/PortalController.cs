using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Sharp.CMS.Common;
using Sharp.CMS.ViewModels.LoginViewModel;

namespace Sharp.CMS.Web.Controllers
{
    public class PortalController : Controller
    {
        [HttpGet]
        public IActionResult Login()
        {
            var token = RandomUniqueToken.Value();
            LoginViewModel loginView = new LoginViewModel()
            {
                Hdrandomtoken = token
            };

            HttpContext.Session.SetString("Hdrandomtoken", token);

            return View(loginView);
        }
    }
}
