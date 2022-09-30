using System.Collections.Generic;
using Sharp.CMS.Models.Page;
using Sharp.CMS.ViewModels.Attachments;

namespace Sharp.CMS.Data.NewPage.Command
{
    public interface INewPageCommand
    {
        bool Add(PageModel PageModel, ContainersModel ContainersModel, List<AttachmentsViewModel> listofAttachments);
    }
}