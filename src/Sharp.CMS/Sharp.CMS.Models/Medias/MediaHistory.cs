﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sharp.CMS.Models.Medias
{
    [Table("MediaHistory")]
    public class MediaHistoryModel
    {
        [Key]
        public int MediaHistoryId { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public DateTime? CreatedOn { get; set; } = DateTime.Now;
        public DateTime? ModifiedOn { get; set; }
        public int? CreatedBy { get; set; }
        public int? ModifiedBy { get; set; }
    }
}