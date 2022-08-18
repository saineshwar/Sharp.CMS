using System;
using System.Data;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.UserMaster;

namespace Sharp.CMS.Data.UserMaster.Command
{
    public class UserMasterCommand : IUserMasterCommand
    {
        private readonly SharpContext _sharpContext;
        private readonly IConfiguration _configuration;
        public UserMasterCommand(SharpContext sharpContext, IConfiguration configuration)
        {
            _sharpContext = sharpContext;
            _configuration = configuration;
        }

        public long? AddUser(UserMasterModel usermaster, int? roleId)
        {
            try
            {
                using var dbContextTransaction = _sharpContext.Database.BeginTransaction();
                try
                {
                    int userId = -1;

                    if (usermaster != null)
                    {
                        usermaster.Status = true;
                        usermaster.CreatedOn = DateTime.Now;
                        usermaster.IsFirstLogin = true;

                        _sharpContext.UserMasters.Add(usermaster);
                        _sharpContext.SaveChanges();
                        userId = usermaster.UserId;

                        if (roleId != null)
                        {
                            var savedAssignedRoles = new AssignedRolesModel()
                            {
                                RoleId = roleId.Value,
                                UserId = userId,
                                AssignedRoleId = 0,
                                Status = true,
                                CreateDate = DateTime.Now
                            };
                            _sharpContext.AssignedRoles.Add(savedAssignedRoles);
                        }

                        _sharpContext.SaveChanges();

                        dbContextTransaction.Commit();
                        return userId;
                    }

                    return userId;
                }
                catch (Exception e)
                {
                    dbContextTransaction.Rollback();
                    return 0;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public string UpdateUser(UserMasterModel usermaster, AssignedRolesModel assignedRoles)
        {
            try
            {
                if (usermaster != null)
                {
                    usermaster.ModifiedOn = DateTime.Now;
                    _sharpContext.Entry(usermaster).State = EntityState.Modified;
                    _sharpContext.Entry(assignedRoles).State = EntityState.Modified;

                    _sharpContext.SaveChanges();
                    return "success";
                }

                return "failed";
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteUser(int? userId)
        {
            try
            {
                UserMasterModel usermaster = _sharpContext.UserMasters.Find(userId);
                if (usermaster != null) _sharpContext.UserMasters.Remove(usermaster);
                _sharpContext.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool UpdatePasswordandHistory(int? userId, string passwordHash, string processType)
        {
            using SqlConnectionManager sqlDataAccessManager = new SqlConnectionManager(_configuration);
            try
            {

                var (connection, transaction) = sqlDataAccessManager.StartTransaction();
                var param = new DynamicParameters();
                param.Add("@UserId", userId);
                param.Add("@PasswordHash", passwordHash);
                param.Add("@ProcessType", processType);
                var result = connection.Execute("Usp_PasswordMaster_UpdatePassword", param, transaction, 0, CommandType.StoredProcedure);

                if (result > 0)
                {
                    sqlDataAccessManager.Commit();
                    return true;
                }
                else
                {
                    sqlDataAccessManager.Rollback();
                    return false;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string ChangeUserStatus(UserMasterModel usermaster)
        {
            try
            {
                _sharpContext.Entry(usermaster).State = EntityState.Modified;
                _sharpContext.SaveChanges();
                return "success";
            }
            catch (Exception)
            {

                throw;
            }
        }

        public string UpdatePassword(string password, int? userId)
        {
            using SqlConnectionManager sqlConnectionManager = new SqlConnectionManager(_configuration);
            try
            {
                var (connection, transaction) = sqlConnectionManager.StartTransaction();
                var param = new DynamicParameters();
                param.Add("@UserId", userId);
                param.Add("@Password", password);
                var result = connection.Execute("CSC_USP_UpdatePassword", param, transaction, 0, CommandType.StoredProcedure);

                if (result > 0)
                {
                    sqlConnectionManager.Commit();
                    return "Success";
                }
                else
                {
                    sqlConnectionManager.Rollback();
                    return "Failed";
                }
            }
            catch (Exception ex)
            {
                sqlConnectionManager.Rollback();
                throw;
            }
        }

        public bool UpdateIsFirstLoginStatus(int? userId)
        {
            using SqlConnectionManager sqlDataAccessManager = new SqlConnectionManager(_configuration);
            try
            {

                var (connection, transaction) = sqlDataAccessManager.StartTransaction();
                var param = new DynamicParameters();
                param.Add("@UserId", userId);
                var result = connection.Execute("Usp_UpdateIsFirstLoginStatus", param, transaction, 0, CommandType.StoredProcedure);

                if (result > 0)
                {
                    sqlDataAccessManager.Commit();
                    return true;
                }
                else
                {
                    sqlDataAccessManager.Rollback();
                    return false;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}