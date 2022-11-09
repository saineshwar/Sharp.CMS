using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sharp.CMS.Models.Medias
{
    [Table("MediaTypes")]
    public class MediaTypesModel
    {
        [Key]
        public int MediaTypeId { get; set; }
        public string MediaTypeName { get; set; }
        public bool IsActive { get; set; }
    }
}