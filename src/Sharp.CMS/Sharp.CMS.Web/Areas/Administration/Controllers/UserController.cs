using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Sharp.CMS.Common;
using Sharp.CMS.Data.RoleMaster.Queries;
using Sharp.CMS.Data.UserMaster.Command;
using Sharp.CMS.Data.UserMaster.Queries;
using Sharp.CMS.Models.UserMaster;
using Sharp.CMS.ViewModels.Login;
using Sharp.CMS.ViewModels.UserMaster;
using Sharp.CMS.Web.Filters;
using Sharp.CMS.Web.Notification;

namespace Sharp.CMS.Web.Areas.Administration.Controllers
{
    [Area("Administration")]
    [SessionTimeOut]
    public class UserController : Controller
    {
        private readonly IRoleQueries _roleQueries;
        private readonly IUserMasterQueries _userMasterQueries;
        private readonly IUserMasterCommand _userMasterCommand;
        private readonly IMapper _mapper;
        private readonly IAssignedRolesQueries _assignedRolesQueries;
        private readonly INotificationService _notificationService;
        private readonly IWebHostEnvironment _webHostEnvironment;



        public UserController(IRoleQueries roleQueries,
            IUserMasterQueries userMasterQueries,
            IUserMasterCommand userMasterCommand,
            IMapper mapper,
            IAssignedRolesQueries assignedRolesQueries,
            INotificationService notificationService,
            IWebHostEnvironment webHostEnvironment)
        {
            _roleQueries = roleQueries;
            _userMasterQueries = userMasterQueries;
            _userMasterCommand = userMasterCommand;
            _mapper = mapper;
            _assignedRolesQueries = assignedRolesQueries;
            _notificationService = notificationService;
            _webHostEnvironment = webHostEnvironment;

        }

        public IActionResult Create()
        {
            try
            {
                var createUserViewModel = new CreateUserViewModel()
                {
                    ListofRoles = _roleQueries.GetAllActiveRoles()
                };
                return View(createUserViewModel);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public ActionResult Create(CreateUserViewModel createUserViewModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (_userMasterQueries.CheckEmailIdExists(createUserViewModel.EmailId))
                    {
                        ModelState.AddModelError("", "EmailId Already Exists");
                    }
                    else if (_userMasterQueries.CheckMobileNoExists(createUserViewModel.MobileNo))
                    {
                        ModelState.AddModelError("", "MobileNo Already Exists");
                    }
                    else if (_userMasterQueries.CheckUsernameExists(createUserViewModel.UserName))
                    {
                        ModelState.AddModelError("", "Username already exists");
                    }
                    else
                    {
                        createUserViewModel.ListofRoles = _roleQueries.GetAllActiveRoles();


                        createUserViewModel.FirstName =
                            UppercaseFirstHelper.UppercaseFirst(createUserViewModel.FirstName);
                        createUserViewModel.LastName =
                            UppercaseFirstHelper.UppercaseFirst(createUserViewModel.LastName);

                        var usermaster = _mapper.Map<UserMasterModel>(createUserViewModel);
                        usermaster.Status = true;
                        usermaster.CreatedOn = DateTime.Now;
                        usermaster.UserId = 0;
                        usermaster.IsFirstLoginDate = DateTime.Now;
                        usermaster.CreatedBy = HttpContext.Session.GetInt32(AllSessionKeys.UserId);

                        if (!string.Equals(createUserViewModel.Password, createUserViewModel.ConfirmPassword,
                            StringComparison.Ordinal))
                        {
                            _notificationService.DangerNotification("Message", "Password Does not Match!");
                            return View(createUserViewModel);
                        }
                        else
                        {
                            usermaster.PasswordHash = createUserViewModel.Password;

                            var userId = _userMasterCommand.AddUser(usermaster, createUserViewModel.RoleId);
                            if (userId != -1)
                            {

                                _notificationService.SuccessNotification("Message", "User Created Successfully");
                            }

                            return RedirectToAction("Index", "User");
                        }
                    }

                    createUserViewModel.ListofRoles = _roleQueries.GetAllActiveRoles();

                    return View("Create", createUserViewModel);
                }
                else
                {
                    createUserViewModel.ListofRoles = _roleQueries.GetAllActiveRoles();

                    return View("Create", createUserViewModel);
                }
            }
            catch
            {
                throw;
            }
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult GridAllUser()
        {
            try
            {
                var draw = HttpContext.Request.Form["draw"].FirstOrDefault();
                var start = Request.Form["start"].FirstOrDefault();
                var length = Request.Form["length"].FirstOrDefault();
                var sortColumn = Request.Form["columns[" + Request.Form["order[0][column]"].FirstOrDefault() + "][name]"].FirstOrDefault();
                var sortColumnDirection = Request.Form["order[0][dir]"].FirstOrDefault();
                var searchValue = Request.Form["search[value]"].FirstOrDefault();
                int pageSize = length != null ? Convert.ToInt32(length) : 0;
                int skip = start != null ? Convert.ToInt32(start) : 0;
                int recordsTotal = 0;


                var currentrole = HttpContext.Session.GetInt32(AllSessionKeys.RoleId);

                if (currentrole == Convert.ToInt32(RolesHelper.Roles.SuperAdmin))
                {
                    var usersdata = _userMasterQueries.ShowAllUsers(sortColumn, sortColumnDirection, searchValue);
                    recordsTotal = usersdata.Count();
                    var data = usersdata.Skip(skip).Take(pageSize).ToList();
                    var jsonData = new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = data };
                    return Ok(jsonData);
                }

                return Ok(null);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IActionResult Edit(int? id)
        {
            try
            {
                if (id == null)
                {
                    return RedirectToAction("Index", "User");
                }
                var userMaster = _userMasterQueries.GetUserForEditByUserId(id);
                userMaster.ListRole = _roleQueries.ListofRoles();
                return View(userMaster);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(EditUserViewModel editUser)
        {
            editUser.ListRole = _roleQueries.ListofRoles();

            if (!ModelState.IsValid)
            {
                return View(editUser);
            }

            var userMaster = _userMasterQueries.GetUserDetailsbyUserId(editUser.UserId);

            if (editUser.MobileNo != userMaster.MobileNo)
            {
                if (_userMasterQueries.CheckMobileNoExists(editUser.MobileNo))
                {
                    ModelState.AddModelError("", "Entered MobileNo Already Exists");
                    return View(editUser);
                }
            }

            if (editUser.EmailId != userMaster.EmailId)
            {
                if (_userMasterQueries.CheckEmailIdExists(editUser.EmailId))
                {
                    ModelState.AddModelError("", "Entered EmailId Already Exists");
                    return View(editUser);
                }
            }
            userMaster.FirstName = editUser.FirstName;
            userMaster.LastName = editUser.LastName;
            userMaster.MobileNo = editUser.MobileNo;
            userMaster.EmailId = editUser.EmailId;
            userMaster.Gender = editUser.Gender;
            userMaster.ModifiedOn = DateTime.Now;
            userMaster.ModifiedBy = Convert.ToInt32(HttpContext.Session.GetInt32(AllSessionKeys.UserId));

            var assignedroles = _assignedRolesQueries.GetAssignedRolesDetailsbyUserId(userMaster.UserId);
            assignedroles.RoleId = editUser.RoleId;

            var result = _userMasterCommand.UpdateUser(userMaster, assignedroles);

            if (result == "success")
            {
                _notificationService.SuccessNotification("Message", "User Details Updated Successfully !");
                return RedirectToAction("Index");
            }
            else
            {
                _notificationService.DangerNotification("Message", "Something went wrong Please Try Once Again !");
                return View(editUser);
            }
        }

        public JsonResult ChangeUserStatus(RequestStatus requestStatus)
        {
            try
            {
                var userMaster = _userMasterQueries.GetUserDetailsbyUserId(requestStatus.UserId);
                userMaster.Status = requestStatus.Status;
                var result = _userMasterCommand.ChangeUserStatus(userMaster);

                if (result == "success")
                {
                    _notificationService.SuccessNotification("Message", "Changed User Status successfully!");
                    return Json(new { Result = "success" });
                }
                else
                {
                    return Json(new { Result = "failed", Message = "Cannot Delete" });
                }

            }
            catch (Exception)
            {
                return Json(new { Result = "failed", Message = "Cannot Delete" });
            }
        }
    }
}
