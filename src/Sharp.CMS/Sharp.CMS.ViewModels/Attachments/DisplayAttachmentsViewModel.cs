namespace Sharp.CMS.ViewModels.Attachments
{
    public class DisplayAttachmentsViewModel
    {
        public long AttachmentId { get; set; }
        public string OriginalAttachmentName { get; set; }
        public string AttachmentType { get; set; }
        public string VirtualPath { get; set; }
        public string DirectoryName { get; set; }
    }
}