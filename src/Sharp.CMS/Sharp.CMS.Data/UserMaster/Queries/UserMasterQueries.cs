using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.UserMaster;
using Sharp.CMS.ViewModels.UserMaster;
using System.Linq.Dynamic.Core;
using Dapper;
using Microsoft.Data.SqlClient;

namespace Sharp.CMS.Data.UserMaster.Queries
{
    public class UserMasterQueries : IUserMasterQueries
    {
        private readonly SharpContext _sharpContext;
        private readonly IConfiguration _configuration;
        public UserMasterQueries(SharpContext bugPointContext, IConfiguration configuration)
        {
            _sharpContext = bugPointContext;
            _configuration = configuration;
        }

        public UserMasterModel GetUserById(long? userId)
        {
            try
            {
                var result = (from user in _sharpContext.UserMasters.AsNoTracking()
                              where user.UserId == userId
                              select user).FirstOrDefault();
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public bool CheckUsernameExists(string username)
        {
            try
            {
                var result = (from menu in _sharpContext.UserMasters
                              where menu.UserName == username
                              select menu).Any();

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public UserMasterModel GetUserByUsername(string username)
        {
            try
            {
                var result = (from usermaster in _sharpContext.UserMasters
                              where usermaster.UserName == username
                              select usermaster).FirstOrDefault();

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public UserMasterModel GetUserdetailsbyEmailId(string emailid)
        {
            try
            {
                var result = (from user in _sharpContext.UserMasters
                              where user.EmailId == emailid
                              select user).FirstOrDefault();

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }


        public bool CheckEmailIdExists(string emailid)
        {
            try
            {
                var result = (from menu in _sharpContext.UserMasters
                              where menu.EmailId == emailid
                              select menu).Any();

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool CheckMobileNoExists(string mobileno)
        {
            try
            {
                var result = (from menu in _sharpContext.UserMasters
                              where menu.MobileNo == mobileno
                              select menu).Any();

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<SelectListItem> GetListofAdmin()
        {
            try
            {

                var adminlist = (from usermaster in _sharpContext.UserMasters
                    join savedroles in _sharpContext.AssignedRoles on usermaster.UserId equals savedroles.UserId
                    where usermaster.Status == true && savedroles.RoleId == 3
                    select new SelectListItem()
                    {
                        Text = usermaster.FirstName + " " + usermaster.LastName,
                        Value = usermaster.UserId.ToString()
                    }).ToList();

                adminlist.Insert(0, new SelectListItem()
                {
                    Value = "",
                    Text = "-----Select-----"
                });

                return adminlist;
            }
            catch (Exception)
            {
                throw;
            }
        }


        public CommonUserDetailsViewModel GetCommonUserDetailsbyUserName(string username)
        {
            var userdata = (from tempuser in _sharpContext.UserMasters
                join assignedRoles in _sharpContext.AssignedRoles on tempuser.UserId equals assignedRoles.UserId
                join roleMaster in _sharpContext.RoleMasters on assignedRoles.RoleId equals roleMaster.RoleId
                where tempuser.UserName == username
                select new CommonUserDetailsViewModel()
                {
                    FirstName = tempuser.FirstName,
                    EmailId = tempuser.EmailId,
                    LastName = tempuser.LastName,
                    RoleId = roleMaster.RoleId,
                    UserId = tempuser.UserId,
                    RoleName = roleMaster.RoleName,
                    Status = tempuser.Status,
                    UserName = tempuser.UserName,
                    PasswordHash = tempuser.PasswordHash,
                    MobileNo = tempuser.MobileNo,
                    IsFirstLogin = tempuser.IsFirstLogin,
                    Gender = tempuser.Gender
                }).FirstOrDefault();

            return userdata;
        }

        public IQueryable<UserMasterGrid> ShowAllUsers(string sortColumn, string sortColumnDir, string search)
        {
            try
            {
                var queryablesUserMasters = (from userMaster in _sharpContext.UserMasters
                                             join assignedRole in _sharpContext.AssignedRoles on userMaster.UserId equals assignedRole.UserId
                                             join roles in _sharpContext.RoleMasters on assignedRole.RoleId equals roles.RoleId
                    
                                             select new UserMasterGrid()
                                             {
                                                 CreatedOn = userMaster.CreatedOn,
                                                 EmailId = userMaster.EmailId,
                                                 FirstName = string.IsNullOrEmpty(userMaster.FirstName) ? "-" : userMaster.FirstName,
                                                 Gender = string.IsNullOrEmpty(userMaster.Gender) ? "-" : userMaster.Gender == "M" ? "Male" : "Female",
                                                 LastName = string.IsNullOrEmpty(userMaster.LastName) ? "-" : userMaster.LastName,
                                                 MobileNo = userMaster.MobileNo,
                                                 RoleName = roles.RoleName,
                                                 UserId = userMaster.UserId,
                                                 UserName = userMaster.UserName,
                                                 Status = userMaster.Status == true ? "Active" : "InActive",
                                                 RoleId = roles.RoleId,
                                                 IsFirstLogin = userMaster.IsFirstLogin == true ? "Yes" : "No"
                                            
                                             }).AsQueryable();

                if (!(string.IsNullOrEmpty(sortColumn) && string.IsNullOrEmpty(sortColumnDir)))
                {
                    queryablesUserMasters = queryablesUserMasters.OrderBy(sortColumn + " " + sortColumnDir);
                }
                else
                {
                    queryablesUserMasters = queryablesUserMasters.OrderByDescending(x => x.UserId);
                }

                if (!string.IsNullOrEmpty(search))
                {
                    queryablesUserMasters = queryablesUserMasters.Where(m => m.UserName.Contains(search) || m.UserName.Contains(search));
                }

                return queryablesUserMasters;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public EditUserViewModel GetUserForEditByUserId(long? userId)
        {
            var role = (from tempuser in _sharpContext.UserMasters
                join assignedRole in _sharpContext.AssignedRoles on tempuser.UserId equals assignedRole.UserId
                join roles in _sharpContext.RoleMasters on assignedRole.RoleId equals roles.RoleId
                where tempuser.UserId == userId
                select new EditUserViewModel()
                {
                    FirstName = tempuser.FirstName,
                    EmailId = tempuser.EmailId,
                    LastName = tempuser.LastName,
                    MobileNo = tempuser.MobileNo,
                    Gender = tempuser.Gender,
                    RoleId = roles.RoleId,
                    Status = roles.Status,
                    UserName = tempuser.UserName,
                    UserId = tempuser.UserId
                }).FirstOrDefault();
            return role;
        }

        public UserMasterModel GetUserDetailsbyUserId(long? userId)
        {
            var userdata = (from tempuser in _sharpContext.UserMasters
                where tempuser.UserId == userId
                select tempuser).FirstOrDefault();

            return userdata;
        }

        public UserProfileViewModel UserProfile(int? userId)
        {
            try
            {
                using SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection"));
                var param = new DynamicParameters();
                param.Add("@UserId", userId);
                var userProfile = con.Query<UserProfileViewModel>("Usp_GetUserDetailforProfilebyUserId", param, null, false, 0, CommandType.StoredProcedure).FirstOrDefault();
                return userProfile;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}