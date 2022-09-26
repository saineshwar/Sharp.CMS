using System.Collections.Generic;
using System.Linq;
using Sharp.CMS.Models.Attachements;
using Sharp.CMS.Models.Page;
using Sharp.CMS.ViewModels.Page;

namespace Sharp.CMS.Data.NewPage.Queries
{
    public interface INewContainerQueries
    {
        bool CheckContainerNameExists(string containername);
        IQueryable<ContainersGrid> ShowAllContainers(string sortColumn, string sortColumnDir, string search);
        ContainersModel GetCoontainerDetailsbyId(int containersId);
        List<AttachmentsModel> GetListofAttachmentsbyPageId(int pageId);
    }
}