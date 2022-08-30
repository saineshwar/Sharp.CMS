using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sharp.CMS.Models.Page
{
    [Table("PageModel")]
    public class PageModel
    {
        [Key]
        public int PageId { get; set; }
        public string PageTitle { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? CreatedBy { get; set; }
        public int? ParentId { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public int? UpdatedBy { get; set; }
        public int? Status { get; set; }
        public bool? IsParent { get; set; }
        public bool? IsPublished { get; set; }
        public bool? IsHidden { get; set; }
        public int? SortOrder { get; set; }
        public bool? OpenInNewTab { get; set; }
        public bool? IsNew { get; set; }
        public string MenuName { get; set; }
    }
}