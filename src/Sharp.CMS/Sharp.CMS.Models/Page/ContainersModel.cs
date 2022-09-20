using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sharp.CMS.Models.Page
{
    [Table("Containers")]
    public class ContainersModel
    {
        [Key]
        public int ContainersId { get; set; }
        public int? PageId { get; set; }
        [MaxLength(50)]
        public string ContainerName { get; set; }
        public int? SortOrder { get; set; }
        [MaxLength(500)]
        public string ContainerDescription_En { get; set; }
        [MaxLength(500)]
        public string ContainerDescription_Ll { get; set; }

    }
}