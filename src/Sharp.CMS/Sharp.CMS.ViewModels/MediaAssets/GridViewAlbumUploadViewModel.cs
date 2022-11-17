using System;

namespace Sharp.CMS.ViewModels.MediaAssets
{
    public class GridViewAlbumUploadViewModel
    {
        public int AlbumUploadId { get; set; }
        public int AlbumId { get; set; }
        public string AlbumName { get; set; }
        public string VirtualPath { get; set; }
        public string IsActive { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public string FileName { get; set; }
    }
}