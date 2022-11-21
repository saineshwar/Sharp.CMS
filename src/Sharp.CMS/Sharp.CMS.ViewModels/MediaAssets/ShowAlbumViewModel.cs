using System;

namespace Sharp.CMS.ViewModels.MediaAssets
{
    public class ShowAlbumViewModel
    {
        public int AlbumUploadId { get; set; }
        public int AlbumId { get; set; }
        public string AlbumName { get; set; }
        public string ThumbnailPath { get; set; }
        public string ThumbnailFileName { get; set; }
        public string ThumbnailFileExtension { get; set; }
        public string IsActive { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
    }
}