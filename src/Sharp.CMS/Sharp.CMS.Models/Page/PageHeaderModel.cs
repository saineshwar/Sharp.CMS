using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sharp.CMS.Models.Page
{
    [Table("PageHeader")]
    public class PageHeaderModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PageHeaderId { get; set; }
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