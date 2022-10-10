using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sharp.CMS.Models.InnerPage
{
    [Table("InnerPageHeader")]
    public class InnerPageHeaderModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int InnerPageHeaderId { get; set; }
        [MaxLength(200)]
        public string PageHeaderName { get; set; }
        public string PageHeaderDetails_EN { get; set; }
        public string PageHeaderDetails_LL { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public bool Status { get; set; }
        public bool IsDefault { get; set; }
    }
}