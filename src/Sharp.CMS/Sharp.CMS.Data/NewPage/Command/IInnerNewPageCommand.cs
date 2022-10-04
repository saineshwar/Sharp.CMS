using System.Collections.Generic;
using Sharp.CMS.Models.InnerPage;
using Sharp.CMS.Models.Page;
using Sharp.CMS.ViewModels.Attachments;
using Sharp.CMS.ViewModels.InnerPage;

namespace Sharp.CMS.Data.NewPage.Command
{
    public interface IInnerNewPageCommand
    {
        bool Add(InnerPageModel pageModel, InnerContainersModel containersModel, List<InnerAttachmentsViewModel> listofAttachments);
        bool Update(InnerPageModel pageModel, InnerContainersModel containersModel, List<InnerAttachmentsViewModel> listofAttachment);
        bool Deactivate(InnerPageModel pageModel);
    }
}