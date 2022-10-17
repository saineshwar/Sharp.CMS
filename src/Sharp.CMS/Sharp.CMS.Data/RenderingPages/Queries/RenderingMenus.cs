using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Sharp.CMS.Common;
using Sharp.CMS.Models.MenuCategory;
using Sharp.CMS.ViewModels.RenderPage;

namespace Sharp.CMS.Data.RenderingPages.Queries
{
    public class RenderingMenus : IRenderingMenus
    {
        private readonly IConfiguration _configuration;
        private readonly IMemoryCache _cache;
        public RenderingMenus(IConfiguration configuration, IMemoryCache cache)
        {
            _configuration = configuration;
            _cache = cache;
        }

        public List<RenderMainPageDetails> GetParentMenus()
        {
            var key = $"{AllMemoryMenuCacheKeys.ParentMenuKey}";
            List<RenderMainPageDetails> menuCategory;
            if (_cache.Get(key) == null)
            {

                using SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection"));
                var param = new DynamicParameters();
                var results = con.Query<RenderMainPageDetails>("Usp_RenderParentMenu", param, null, false, 0, CommandType.StoredProcedure).ToList();

                MemoryCacheEntryOptions cacheExpirationOptions = new MemoryCacheEntryOptions
                {
                    AbsoluteExpiration = DateTime.Now.AddDays(7),
                    Priority = CacheItemPriority.Normal
                };

                menuCategory = _cache.Set<List<RenderMainPageDetails>>(key, results, cacheExpirationOptions);
            }
            else
            {
                menuCategory = _cache.Get(key) as List<RenderMainPageDetails>;
            }

            return menuCategory;
        }

        public List<RenderMainPageDetails> GetChildMenus(int parentId)
        {
            var key = $"{AllMemoryMenuCacheKeys.ChildMenuKey}";
            List<RenderMainPageDetails> menuslist;
            if (_cache.Get(key) == null)
            {

                using SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection"));
                var param = new DynamicParameters();
                param.Add("@ParentId", parentId);
                var results = con.Query<RenderMainPageDetails>("Usp_RenderFirstChildMenu", param, null, false, 0, CommandType.StoredProcedure).ToList();

                MemoryCacheEntryOptions cacheExpirationOptions = new MemoryCacheEntryOptions
                {
                    AbsoluteExpiration = DateTime.Now.AddDays(7),
                    Priority = CacheItemPriority.Normal
                };

                menuslist = _cache.Set<List<RenderMainPageDetails>>(key, results, cacheExpirationOptions);
            }
            else
            {
                menuslist = _cache.Get(key) as List<RenderMainPageDetails>;


                var data = (from querydata in menuslist
                    where querydata.ParentPageId == parentId
                    select querydata).ToList();

                return data;
            }

            return menuslist;
        }

        public List<RenderMainPageDetails> GetSubChildMenus(int childId)
        {
            var key = $"{AllMemoryMenuCacheKeys.SubChildMenuKey}";
            List<RenderMainPageDetails> menuslist;
            if (_cache.Get(key) == null)
            {

                using SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection"));
                var param = new DynamicParameters();
                param.Add("@ChildId", childId);
                var results = con.Query<RenderMainPageDetails>("Usp_RenderFirstSubChildMenu", param, null, false, 0, CommandType.StoredProcedure).ToList();

                MemoryCacheEntryOptions cacheExpirationOptions = new MemoryCacheEntryOptions
                {
                    AbsoluteExpiration = DateTime.Now.AddDays(7),
                    Priority = CacheItemPriority.Normal
                };

                menuslist = _cache.Set<List<RenderMainPageDetails>>(key, results, cacheExpirationOptions);
                return menuslist;
            }
            else
            {
                menuslist = _cache.Get(key) as List<RenderMainPageDetails>;

                var data = (from querydata in menuslist
                    where querydata.ChildPageId == childId
                    select querydata).ToList();

                return data;
            }

      
        }



        public bool CheckHasFirstChild(int parentId)
        {

            using SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DatabaseConnection"));
            var param = new DynamicParameters();
            param.Add("@ParentId", parentId);
            var results = con.Query<bool>("Usp_CheckHasFirstChildMenu", param, null, false, 0, CommandType.StoredProcedure).FirstOrDefault();

            return results;
        }
    }
}