using System;
using System.ComponentModel.DataAnnotations;

namespace Sharp.CMS.ViewModels.RenderPage
{
    public class RenderContainersDetails
    {
        public int ContainersId { get; set; }
        public string ContainerName { get; set; }
        public int? SortOrder { get; set; }
        public string ContainerDescription_En { get; set; }
        public string ContainerDescription_Ll { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public bool Status { get; set; }
        public int? PageId { get; set; }
    }
}