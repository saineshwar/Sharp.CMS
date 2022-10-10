using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sharp.CMS.Models.Page
{
    [Table("PageWidget")]
    public class PageWidgetsModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PageWidgetId { get; set; }

        [MaxLength(100)]
        public string PageWidgetName { get; set; }
      
        public string PageWidgetDetails_EN { get; set; }
   
        public string PageWidgetDetails_LL { get; set; }
        public bool Status { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public int? SortOrder { get; set; }
        public bool IsDefault { get; set; }

    }
}