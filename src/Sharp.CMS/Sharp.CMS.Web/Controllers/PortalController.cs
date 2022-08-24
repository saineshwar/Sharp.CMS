using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DNTCaptcha.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Sharp.CMS.Common;
using Sharp.CMS.Data.Audit.Command;
using Sharp.CMS.Data.Notices.Queries;
using Sharp.CMS.Data.UserMaster.Queries;
using Sharp.CMS.Web.Notification;
using System.Globalization;
using Sharp.CMS.Models.Audit;
using System.Security.Cryptography;
using System.Text;
using Sharp.CMS.ViewModels.Login;
using Sharp.CMS.ViewModels.UserMaster;

namespace Sharp.CMS.Web.Controllers
{
    public class PortalController : Controller
    {
        private readonly IUserMasterQueries _userMasterQueries;
        private readonly ILogger<PortalController> _logger;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IAuditCommand _auditCommand;
        private readonly INotificationService _notificationService;
        private readonly INoticeQueries _noticeQueries;

        public PortalController(IDNTCaptchaValidatorService validatorService,
            IUserMasterQueries userMasterQueries,
            ILogger<PortalController> logger,
            IHttpContextAccessor httpContextAccessor,
            IAuditCommand auditCommand,
            INotificationService notificationService,
            INoticeQueries noticeQueries)
        {
            _userMasterQueries = userMasterQueries;
            _logger = logger;
            _httpContextAccessor = httpContextAccessor;
            _auditCommand = auditCommand;
            _notificationService = notificationService;
            _noticeQueries = noticeQueries;
        }

        [HttpGet]
        public IActionResult Login()
        {
            var token = RandomUniqueToken.Value();
            LoginViewModel loginView = new LoginViewModel()
            {
                Hdrandomtoken = token
            };

            HttpContext.Session.SetString("Hdrandomtoken", token);

            var hiddentoken = HttpContext.Session.GetString("Hdrandomtoken");

            if (string.IsNullOrEmpty(hiddentoken))
            {
                TempData["LoginErrorMessage"] = "Creating Token Issue Retry Again";
            }

            if (_noticeQueries.ShowNotice() != null)
            {
                var notice = _noticeQueries.ShowNotice();
                ViewBag.NoticeTitle = notice.NoticeTitle;
                ViewBag.Noticebody = notice.NoticeBody;
                ViewBag.NoticeCreatedOn = notice.CreatedOn;
            }

            return View(loginView);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Login(LoginViewModel loginViewModel)
        {
            var token = RandomUniqueToken.Value();

            if (ModelState.IsValid)
            {
                //    if (!_validatorService.HasRequestValidCaptchaEntry(Language.English, DisplayMode.ShowDigits))
                //    {
                //        TempData["LoginErrorMessage"] = "Please enter valid security code";
                //        return RedirectToAction("Login");
                //    }
                if (!_userMasterQueries.CheckUsernameExists(loginViewModel.Username))
                {
                    _logger.LogError($"CheckUsernameExists :- {loginViewModel.Username}");
                    TempData["LoginErrorMessage"] = "Entered Username or Password is Invalid";
                    return RedirectToAction("Login");
                }
                else
                {
                    var loggedInuserdetails = _userMasterQueries.GetCommonUserDetailsbyUserName(loginViewModel.Username);

                    if (loggedInuserdetails == null)
                    {
                        TempData["LoginErrorMessage"] = "Entered Username or Password is Invalid";
                        _logger.LogError($"GetCommonUserDetailsbyUserName");
                        return RedirectToAction("Login");
                    }

                    if (loggedInuserdetails.Status == false)
                    {
                        TempData["LoginErrorMessage"] = "Your Account is InActive Contact Administrator";
                        return RedirectToAction("Login");
                    }

                    var hiddentoken = HttpContext.Session.GetString("Hdrandomtoken");

                    if (string.IsNullOrEmpty(hiddentoken))
                    {
                        TempData["LoginErrorMessage"] = "Token Issue Retry Again";
                        return RedirectToAction("Login");
                    }

                    if (ConcateTokenandPassword(loggedInuserdetails.PasswordHash, hiddentoken) == loginViewModel.Password)
                    {
                        SetAuthenticationCookie();
                        SetApplicationSession(loggedInuserdetails);

                        if (loggedInuserdetails.IsFirstLogin == true)
                        {
                            HttpContext.Session.SetString("Portal.IsFirstLogin", "1");
                            return RedirectToAction("Changepassword", "MyAccount");
                        }

                        Greetings(loggedInuserdetails.FirstName);

                        switch (loggedInuserdetails.RoleId)
                        {
                            case 1:
                                return RedirectToAction("Dashboard", "Dashboard", new { Area = "Administration" });
                            case 2:
                                return RedirectToAction("Index", "MyDashboard", new { Area = "Administration" });
                            case 3:
                                return RedirectToAction("Dashboard", "Manager", new { Area = "" });
                        }

                    }
                    else
                    {

                        TempData["LoginErrorMessage"] = "Entered Username or Password is Invalid";

                        return RedirectToAction("Login");
                    }


                }
            }

            loginViewModel.Hdrandomtoken = token;
            HttpContext.Session.SetString("Hdrandomtoken", token);
            return View(loginViewModel);
        }



        [HttpPost]
        public IActionResult Logout()
        {
            try
            {
                AuditLogout();
                CookieOptions option = new CookieOptions();

                if (Request.Cookies[AllSessionKeys.AuthenticationToken] != null)
                {
                    option.Expires = DateTime.Now.AddDays(-1);
                    Response.Cookies.Append(AllSessionKeys.AuthenticationToken, "", option);
                }

                HttpContext.Session.Clear();

                return RedirectToAction("Login", "Portal");
            }
            catch (Exception)
            {
                throw;
            }

        }

        private void SetAuthenticationCookie()
        {
            string strAuthToken = Guid.NewGuid().ToString();
            HttpContext.Session.SetString(AllSessionKeys.AuthenticationToken, strAuthToken);
            Response.Cookies.Append(AllSessionKeys.AuthenticationToken, strAuthToken);
        }

        private void SetApplicationSession(CommonUserDetailsViewModel commonUser)
        {
            HttpContext.Session.SetInt32(AllSessionKeys.RoleId, commonUser.RoleId);
            HttpContext.Session.SetInt32(AllSessionKeys.UserId, Convert.ToInt32(commonUser.UserId));
            HttpContext.Session.SetString(AllSessionKeys.UserName, Convert.ToString(commonUser.UserName));
            HttpContext.Session.SetString(AllSessionKeys.RoleIdString, Convert.ToString(commonUser.RoleId));
            HttpContext.Session.SetString(AllSessionKeys.RoleName, Convert.ToString(commonUser.RoleName));
            if (commonUser.FirstName != null)
                HttpContext.Session.SetString(AllSessionKeys.FirstName, Convert.ToString(commonUser.FirstName));
            if (commonUser.LastName != null)
                HttpContext.Session.SetString(AllSessionKeys.LastName, Convert.ToString(commonUser.LastName));
            if (commonUser.FirstName != null && commonUser.LastName != null)
                HttpContext.Session.SetString(AllSessionKeys.FullName, $"{commonUser.FirstName} {commonUser.LastName}");
            HttpContext.Session.SetString(AllSessionKeys.EmailId, Convert.ToString(commonUser.EmailId));
            HttpContext.Session.SetString(AllSessionKeys.MobileNo, Convert.ToString(commonUser.MobileNo));
            HttpContext.Session.SetString(AllSessionKeys.Gender, Convert.ToString(commonUser.Gender));
            AuditLogin();
        }

        [NonAction]
        private string ConcateTokenandPassword(string storedDatabasePassword, string hiddenrandomtoken)
        {
            try
            {
                return ComputeSha256Hash(hiddenrandomtoken + storedDatabasePassword);
            }
            catch (Exception)
            {
                throw;
            }
        }
        private static string ComputeSha256Hash(string rawData)
        {
            // Create a SHA256   
            try
            {
                using SHA256 sha256Hash = SHA256.Create();
                // ComputeHash - returns byte array  
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));

                // Convert byte array to a string   
                StringBuilder builder = new StringBuilder();
                foreach (var t in bytes)
                {
                    builder.Append(t.ToString("x2"));
                }
                return builder.ToString();
            }
            catch (Exception)
            {

                throw;
            }
        }

        private void AuditLogin()
        {
            try
            {
                var objaudit = new AuditModel();
                objaudit.AuditId = 0;
                objaudit.RoleId = HttpContext.Session.GetInt32(AllSessionKeys.RoleId);
                objaudit.ControllerName = "Portal";
                objaudit.ActionName = "Login";
                objaudit.Area = "";
                objaudit.LoggedInAt = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture);
                if (_httpContextAccessor.HttpContext != null)
                    objaudit.IPAddress = Convert.ToString(_httpContextAccessor.HttpContext.Connection.RemoteIpAddress);
                objaudit.UserID = HttpContext.Session.GetInt32(AllSessionKeys.UserId);
                objaudit.PortalToken = "";
                objaudit.PageAccessed = "";
                objaudit.SessionID = HttpContext.Session.Id;
                objaudit.CurrentDatetime = DateTime.Now;
                objaudit.Logged = true;
                _auditCommand.InsertAuditData(objaudit);
            }
            catch (Exception)
            {

                throw;
            }
        }
        private void AuditLogout()
        {
            try
            {
                var objaudit = new AuditModel();
                objaudit.AuditId = 0;
                objaudit.RoleId = HttpContext.Session.GetInt32(AllSessionKeys.RoleId);
                objaudit.ControllerName = "Portal";
                objaudit.ActionName = "Logout";
                objaudit.Area = "";
                objaudit.LoggedOutAt = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture);
                if (_httpContextAccessor.HttpContext != null)
                    objaudit.IPAddress = Convert.ToString(_httpContextAccessor.HttpContext.Connection.RemoteIpAddress);
                objaudit.UserID = HttpContext.Session.GetInt32(AllSessionKeys.UserId);
                objaudit.PortalToken = "";
                objaudit.PageAccessed = "";
                objaudit.SessionID = HttpContext.Session.Id;
                objaudit.CurrentDatetime = DateTime.Now;
                objaudit.Logged = true;
                _auditCommand.InsertAuditData(objaudit);
            }
            catch (Exception)
            {

                throw;
            }
        }

        private void Greetings(string name)
        {

            var message = "";
            var currentDateTime = DateTime.Now;
            int currentHour = currentDateTime.Hour;
            int startMorningHour = 6;
            int startAfternoonHour = 12;
            int startEveningHour = 17;
            int startNightHour = 22;

            if (startMorningHour <= currentHour && currentHour < startAfternoonHour)
            {
                message = "Good morning!";
            }
            if (startAfternoonHour <= currentHour && currentHour < startEveningHour)
            {
                message = "Good Afternoon!";
            }

            if (startEveningHour <= currentHour && currentHour < startNightHour)
            {
                message = "Good Evening!";
            }
            if (startNightHour <= currentHour || currentHour < startMorningHour)
            {
                message = "Good Night!";
            }
            _notificationService.InformationNotification("Message", NotificationType.Info, $"{message}, {name}");

        }
    }
}
