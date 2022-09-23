using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sharp.CMS.Models.Page
{
    [Table("PageFooter")]
    public class PageFooterModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PageFooterId { get; set; }
        [MaxLength(200)]
        public string PageFooterName { get; set; }
       
        public string PageFooterDetails_EN { get; set; }
        public string PageFooterDetails_LL { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public bool Status { get; set; }
    }

}