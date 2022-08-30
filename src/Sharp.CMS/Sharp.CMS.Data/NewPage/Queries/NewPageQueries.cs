using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
using Sharp.CMS.Data.Data;

namespace Sharp.CMS.Data.NewPage.Queries
{
    public class NewPageQueries
    {
        private readonly SharpContext _sharpContext;
        public NewPageQueries(SharpContext sharpContext)
        {
            _sharpContext = sharpContext;
        }

        public List<SelectListItem> ListofRoles()
        {
            var listofrolesdata = (from roles in _sharpContext.PageModel
                                   orderby roles.PageId ascending
                                   where roles.Status == 1
                                   select new SelectListItem()
                                   {
                                       Text = roles.MenuName,
                                       Value = roles.PageId.ToString()
                                   }).ToList();

            listofrolesdata.Insert(0, new SelectListItem()
            {
                Value = "",
                Text = "-----Select-----"
            });
            return listofrolesdata;
        }
    }
}