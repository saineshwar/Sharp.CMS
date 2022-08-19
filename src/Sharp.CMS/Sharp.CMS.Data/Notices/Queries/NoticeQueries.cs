using System;
using System.Data;
using System.Linq;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Linq.Dynamic.Core;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Data.Notices.Queries;
using Sharp.CMS.Models.Notices;
using Sharp.CMS.ViewModels.Notices;

namespace Sharp.CMS.Data.Notices.Queries
{
    public class NoticeQueries : INoticeQueries
    {
        private readonly IConfiguration _configuration;
        private readonly SharpContext _sharpContext;
        public NoticeQueries(IConfiguration configuration, SharpContext SharpContext)
        {
            _configuration = configuration;
            _sharpContext = SharpContext;
        }

        public NoticeDisplayViewModel ShowNotice()
        {
            try
            {
                using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection")))
                {
                    return con.Query<NoticeDisplayViewModel>("Usp_ShowNotice", null, null, false, 0, CommandType.StoredProcedure).FirstOrDefault();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public bool ShowNotice(string fromdatetime, string todatetime)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection")))
                {
                    var param = new DynamicParameters();
                    param.Add("@fromdatetime", fromdatetime);
                    param.Add("@todatetime", todatetime);
                    return con.Query<bool>("Usp_ValidateNotice", param, null, false, 0, CommandType.StoredProcedure).FirstOrDefault();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IQueryable<NoticeGrid> ShowAllNotice(string sortColumn, string sortColumnDir, string search)
        {
            try
            {
                var queryableMenuMaster = (from notice in _sharpContext.Notice
                                           orderby notice.NoticeId descending
                                           select new NoticeGrid()
                                           {
                                               Status = notice.Status == true ? "Active" : "InActive",
                                               NoticeStart = notice.NoticeStart,
                                               NoticeEnd = notice.NoticeEnd,
                                               CreatedOn = notice.CreatedOn,
                                               NoticeId = notice.NoticeId,
                                               NoticeTitle = notice.NoticeTitle
                                           }
                    );

                if (!(string.IsNullOrEmpty(sortColumn) && string.IsNullOrEmpty(sortColumnDir)))
                {
                    queryableMenuMaster = queryableMenuMaster.OrderBy(sortColumn + " " + sortColumnDir);
                }


                if (!string.IsNullOrEmpty(search))
                {
                    queryableMenuMaster = queryableMenuMaster.Where(m => m.NoticeTitle.Contains(search) || m.NoticeTitle.Contains(search));
                }

                return queryableMenuMaster;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public EditNoticeViewModel GetNoticeDetailsForEdit(int? noticeId)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection")))
                {
                    var param = new DynamicParameters();
                    param.Add("@NoticeId", noticeId);
                    return con.Query<EditNoticeViewModel>("Usp_GetNoticeforEditbyNoticeId", param, null, false, 0, CommandType.StoredProcedure).FirstOrDefault();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public Notice GetNoticeByNoticeId(int? noticeId)
        {
            try
            {
                var editmenu = (from notice in _sharpContext.Notice
                                where notice.NoticeId == noticeId
                                select notice).FirstOrDefault();

                return editmenu;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public NoticeDetails GetNoticeDetailsByNoticeId(int? noticeId)
        {
            try
            {
                var editNoticeDetails = (from notice in _sharpContext.NoticeDetails
                                         where notice.NoticeId == noticeId
                                         select notice).FirstOrDefault();

                return editNoticeDetails;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}