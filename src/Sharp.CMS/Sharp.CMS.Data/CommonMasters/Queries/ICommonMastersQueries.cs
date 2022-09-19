using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Sharp.CMS.Data.CommonMasters.Queries
{
    public interface ICommonMastersQueries
    {
        List<SelectListItem> GetStatusList();
    }
}