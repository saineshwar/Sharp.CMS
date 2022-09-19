using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sharp.CMS.Models.StatusMaster
{
    [Table("StatusMaster")]
    public class StatusMasterModel
    {
        [Key]
        public int StatusId { get; set; }
        public string Status { get; set; }
        public bool IsActive { get; set; }
    }
}