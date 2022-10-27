using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Dynamic.Core;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Sharp.CMS.Common;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.Page;
using Sharp.CMS.ViewModels.Page;
using Sharp.CMS.ViewModels.RenderPage;
using Sharp.CMS.ViewModels.UserMaster;

namespace Sharp.CMS.Data.RenderingPages.Queries
{
    public class RenderingPageQueries : IRenderingPageQueries
    {
        private readonly SharpContext _sharpContext;
        private readonly IConfiguration _configuration;
        private readonly IMemoryCache _cache;
        public RenderingPageQueries(SharpContext sharpContext, IConfiguration configuration, IMemoryCache cache)
        {
            _sharpContext = sharpContext;
            _configuration = configuration;
            _cache = cache;
        }

        public RenderMainPageDetails ShowHomePage(string pagename,bool iscached)
        {
            var custompagekey = string.Empty;
            if (!string.IsNullOrEmpty(pagename))
            {
                custompagekey = $"Portal.{pagename}";
            }

            var dataKey = string.IsNullOrEmpty(pagename) ? AllPageCacheKeys.HomePageKey : custompagekey;
            try
            {
                if (!_cache.TryGetValue(dataKey, out RenderMainPageDetails renderMainPageDetails) || iscached == false)
                {
                    using SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection"));
                    var param = new DynamicParameters();
                    param.Add("@Pagename", pagename);
                    var data = con.Query<RenderMainPageDetails>("Usp_Render_GetHomePage", param, null, false, 0, CommandType.StoredProcedure).FirstOrDefault();


                    var cacheExpirationOptions = new MemoryCacheEntryOptions
                    {
                        AbsoluteExpiration = DateTime.Now.AddDays(7),
                        Priority = CacheItemPriority.Normal
                    };

                    return _cache.Set<RenderMainPageDetails>(dataKey, data, cacheExpirationOptions);

                }
                else
                {
                    return _cache.Get(dataKey) as RenderMainPageDetails;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public RenderPageDetails ShowPageDetails(int pageId)
        {
            try
            {
                using SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection"));
                var param = new DynamicParameters();
                param.Add("@PageId", pageId);
                var data = con.Query<RenderPageDetails>("Usp_Render_GetPageDetails", param, null, false, 0, CommandType.StoredProcedure).FirstOrDefault();
                return data;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public RenderPageHeaderDetails ShowPageheaderDetails()
        {
            try
            {
                using SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection"));
                var param = new DynamicParameters();

                var data = con.Query<RenderPageHeaderDetails>("Usp_Render_GetPageHeader", param, null, false, 0, CommandType.StoredProcedure).FirstOrDefault();
                return data;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public RenderPageFooterDetails ShowPageFooterDetails()
        {
            try
            {
                using SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection"));
                var param = new DynamicParameters();

                var data = con.Query<RenderPageFooterDetails>("Usp_Render_GetPageFooter", param, null, false, 0, CommandType.StoredProcedure).FirstOrDefault();
                return data;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public RenderContainersDetails ShowContainersDetails(int pageId)
        {
            try
            {
                using SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection"));
                var param = new DynamicParameters();
                param.Add("@PageId", pageId);
                var data = con.Query<RenderContainersDetails>("Usp_Render_GetContainers", param, null, false, 0, CommandType.StoredProcedure).FirstOrDefault();
                return data;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool GetIsPageCached(string pagename)
        {
            if (string.IsNullOrEmpty(pagename))
            {
                var queryable = (from page in _sharpContext.PageModel
                        where page.IsHomePage == true
                        select page.IsCached
                    ).FirstOrDefault();
                return queryable;
            }
            else
            {
                var queryable = (from page in _sharpContext.PageModel
                        where page.PageName == pagename
                        select page.IsCached
                    ).FirstOrDefault();
                return queryable;
            }
           

           
        }

        public bool IsPageExits(string pagename)
        {
            var queryable = (from page in _sharpContext.PageModel
                    where page.PageName == pagename
                    select page
                ).Any();

            return queryable;
        }
    }
}