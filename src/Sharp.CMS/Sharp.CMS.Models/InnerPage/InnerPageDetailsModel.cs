using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Sharp.CMS.Models.Page;

namespace Sharp.CMS.Models.InnerPage
{
    [Table("InnerPageDetails")]
    public class InnerPageDetailsModel
    {
        [Key]
        public int InnerPageDetailsId { get; set; }
        public string PageHeading_EN { get; set; }
        public string PageHeading_LL { get; set; }
        public string MetaDescription_EN { get; set; }
        public string MetaDescription_LL { get; set; }
        public string MetaKeywords_LL { get; set; }
        public string MetaKeywords_EN { get; set; }

        [ForeignKey("InnerPageId")]
        public int InnerPageId { get; set; }
        public InnerPageModel InnerPage { get; set; }
    }
}