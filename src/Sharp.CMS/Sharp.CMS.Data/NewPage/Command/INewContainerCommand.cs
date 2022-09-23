using System.Collections.Generic;
using Sharp.CMS.Models.Attachements;
using Sharp.CMS.Models.Page;
using Sharp.CMS.ViewModels.Attachments;

namespace Sharp.CMS.Data.NewPage.Command
{
    public interface INewContainerCommand
    {
        bool Add(ContainersModel containersModel, List<AttachmentsViewModel> listofAttachment);
    }
}