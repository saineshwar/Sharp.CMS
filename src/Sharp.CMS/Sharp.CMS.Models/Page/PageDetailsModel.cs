using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sharp.CMS.Models.Page
{
    [Table("PageDetails")]
    public class PageDetailsModel
    {
        [Key]
        public int PageDetailsId { get; set; }
        public string PageHeading { get; set; }
        public string MetaDescription { get; set; }
        public string MetaKeywords { get; set; }
        public int PageId { get; set; }

    }
}