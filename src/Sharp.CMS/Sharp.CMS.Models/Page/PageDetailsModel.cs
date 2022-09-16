using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sharp.CMS.Models.Page
{
    [Table("PageDetails")]
    public class PageDetailsModel
    {
        [Key]
        public int PageDetailsId { get; set; }
        public string PageHeading_EN { get; set; }
        public string PageHeading_LL { get; set; }
        public string MetaDescription_EN { get; set; }
        public string MetaDescription_LL { get; set; }
        public string MetaKeywords_LL { get; set; }
        public string MetaKeywords_EN { get; set; }

        [ForeignKey("PageId")]
        public int PageId { get; set; }
        public  PageModel Page { get; set; }

    }
}