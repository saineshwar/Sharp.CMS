using System.Collections.Generic;
using System.Linq;
using Sharp.CMS.Models.Attachements;
using Sharp.CMS.Models.InnerPage;
using Sharp.CMS.Models.Page;
using Sharp.CMS.ViewModels.Attachments;
using Sharp.CMS.ViewModels.InnerPage;
using Sharp.CMS.ViewModels.Page;

namespace Sharp.CMS.Data.InnerPages.Queries
{
    public interface IInnerNewContainerQueries
    {
        bool CheckContainerNameExists(string containername);
        IQueryable<InnerContainersGrid> ShowAllContainers(string sortColumn, string sortColumnDir, string search);
        InnerContainersModel GetCoontainerDetailsbyId(int containersId);
        List<DisplayInnerAttachmentsViewModel> GetListofAttachmentsbyPageId(int pageId);
        InnerAttachmentsModel GetAttachmentsByAttachmentId(long pageId, long attachmentId);
    }
}