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

       
    }
}