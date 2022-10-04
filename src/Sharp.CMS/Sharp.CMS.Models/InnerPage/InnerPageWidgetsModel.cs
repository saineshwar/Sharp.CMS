using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sharp.CMS.Models.InnerPage
{
    [Table("InnerPageWidget")]
    public class InnerPageWidgetsModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int InnerPageWidgetId { get; set; }

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
    }
}