﻿using System;

namespace Sharp.CMS.ViewModels.InnerPage
{
    public class InnerAttachmentsViewModel
    {
        public string OriginalAttachmentName { get; set; }
        public string GenerateAttachmentName { get; set; }
        public string AttachmentType { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public int? CreatedBy { get; set; }
        public int? ModifiedBy { get; set; }
        public string PhysicalPath { get; set; }
        public string VirtualPath { get; set; }
        public string DirectoryName { get; set; }
        public int? InnerPageId { get; set; }
    }
}