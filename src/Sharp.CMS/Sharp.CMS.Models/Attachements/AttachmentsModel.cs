using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sharp.CMS.Models.Attachements
{
    [Table("Attachments")]
    public class AttachmentsModel
    {
        [Key]
        public long AttachmentId { get; set; }
        public string OriginalAttachmentName { get; set; }
        public string GenerateAttachmentName { get; set; }
        public string AttachmentType { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public int? CreatedBy { get; set; }
        public int? ModifiedBy { get; set; }
        public int? PageId { get; set; }
        public string PhysicalPath { get; set; }
        public string VirtualPath { get; set; }
        public string DirectoryName { get; set; }
    }
}