using Sharp.CMS.Models.InnerPage;

namespace Sharp.CMS.Data.InnerPages.Command
{
    public interface IInnerNewContainerCommand
    {
        bool DeleteAttachmentByAttachmentId(InnerAttachmentsModel attachmentsModel);
    }
}