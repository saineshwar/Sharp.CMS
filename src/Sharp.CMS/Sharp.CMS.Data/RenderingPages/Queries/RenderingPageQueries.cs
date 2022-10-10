using System;
using System.Data;
using System.Linq;
using System.Linq.Dynamic.Core;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Configuration;
using Sharp.CMS.Data.Data;
using Sharp.CMS.ViewModels.Page;
using Sharp.CMS.ViewModels.RenderPage;
using Sharp.CMS.ViewModels.UserMaster;

namespace Sharp.CMS.Data.RenderingPages.Queries
{
    public class RenderingPageQueries : IRenderingPageQueries
    {
        private readonly SharpContext _sharpContext;
        private readonly IConfiguration _configuration;
        public RenderingPageQueries(SharpContext sharpContext, IConfiguration configuration)
        {
            _sharpContext = sharpContext;
            _configuration = configuration;
        }

        public RenderMainPageDetails ShowHomePage(string pagename)
        {
            try
            {
                using SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection"));
                var param = new DynamicParameters();
                param.Add("@Pagename", pagename);
                var userProfile = con.Query<RenderMainPageDetails>("Usp_Render_GetHomePage", param, null, false, 0, CommandType.StoredProcedure).FirstOrDefault();
                return userProfile;

            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}