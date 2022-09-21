using Sharp.CMS.Data.Data;
using System;
using System.Linq;
using System.Linq.Dynamic.Core;

namespace Sharp.CMS.Data.NewPage.Queries
{
    public class NewContainerQueries : INewContainerQueries
    {
        private readonly SharpContext _sharpContext;
        public NewContainerQueries(SharpContext sharpContext)
        {
            _sharpContext = sharpContext;
        }

        public bool CheckContainerNameExists(string containername)
        {
            try
            {
                var queryable = (from page in _sharpContext.ContainersModel
                                 where page.ContainerName == containername
                                 select page).Any();

                return queryable;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}