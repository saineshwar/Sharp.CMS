using System.Linq;
using Sharp.CMS.ViewModels.Page;

namespace Sharp.CMS.Data.NewPage.Queries
{
    public interface INewContainerQueries
    {
        bool CheckContainerNameExists(string containername);
        IQueryable<ContainersGrid> ShowAllContainers(string sortColumn, string sortColumnDir, string search);
    }
}