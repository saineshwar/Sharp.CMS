using System;

namespace Sharp.CMS.ViewModels.Attachments
{
    public class AttachmentsViewModel
    {
        public string OriginalAttachmentName { get; set; }
        public string GenerateAttachmentName { get; set; }
        public string AttachmentType { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public int? CreatedBy { get; set; }
        public int? ModifiedBy { get; set; }
        public int? PageId { get; set; }
        public string Path { get; set; }
        public string DirectoryName { get; set; }
    }
}