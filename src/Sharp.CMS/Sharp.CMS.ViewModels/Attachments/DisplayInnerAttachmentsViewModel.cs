namespace Sharp.CMS.ViewModels.Attachments
{
    public class DisplayInnerAttachmentsViewModel
    {
        public long InnerAttachmentId { get; set; }
        public string OriginalAttachmentName { get; set; }
        public string AttachmentType { get; set; }
        public string VirtualPath { get; set; }
        public string DirectoryName { get; set; }
    }
}