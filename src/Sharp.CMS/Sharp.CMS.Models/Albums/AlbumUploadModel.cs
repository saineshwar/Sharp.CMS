using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sharp.CMS.Models.Albums
{
    [Table("AlbumUploads")]
    public class AlbumUploadModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AlbumUploadId { get; set; }
        public int AlbumId { get; set; }
        [MaxLength(1000)]
        public string PhysicalPath { get; set; }
        [MaxLength(1000)]
        public string VirtualPath { get; set; }
        [MaxLength(100)]
        public string FileName { get; set; }
        [MaxLength(100)]
        public string FileType { get; set; }
        [MaxLength(100)]
        public string FileExtension { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public int? ModifiedBy { get; set; }

    }
}