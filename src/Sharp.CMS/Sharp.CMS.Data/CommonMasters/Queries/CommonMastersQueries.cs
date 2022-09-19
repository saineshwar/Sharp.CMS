using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Caching.Memory;
using Sharp.CMS.Data.Data;

namespace Sharp.CMS.Data.CommonMasters.Queries
{
    public class CommonMastersQueries : ICommonMastersQueries
    {
        private readonly SharpContext _sharpContext;
        private readonly IMemoryCache _cache;
        public CommonMastersQueries(SharpContext bugPointContext, IMemoryCache cache)
        {
            _sharpContext = bugPointContext;
            _cache = cache;
        }

        public List<SelectListItem> GetStatusList()
        {
            var categoryList = (from status in _sharpContext.StatusMaster
                where status.IsActive == true 
                select new SelectListItem()
                {
                    Text = status.Status,
                    Value = status.StatusId.ToString()
                }).ToList();

            categoryList.Insert(0, new SelectListItem()
            {
                Value = "",
                Text = "-----Select-----"
            });

            return categoryList;
        }
    }


}