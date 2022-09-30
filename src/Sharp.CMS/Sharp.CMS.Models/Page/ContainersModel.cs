using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sharp.CMS.Models.Page
{
    [Table("Containers")]
    public class ContainersModel
    {
        [Key]
        public int ContainersId { get; set; }

        [MaxLength(50)]
        public string ContainerName { get; set; }
        public int? SortOrder { get; set; }
        [MaxLength(500)]
        public string ContainerDescription_En { get; set; }
        [MaxLength(500)]
        public string ContainerDescription_Ll { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public bool Status { get; set; }
        public int? PageId { get; set; }
    }
}