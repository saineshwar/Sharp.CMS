using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sharp.CMS.Models.UserMaster
{
    [Table("SavedAssignedRoles")]
    public class AssignedRolesModel
    {
        [Key]
        public int AssignedRoleId { get; set; }
        public int RoleId { get; set; }
        public DateTime? CreateDate { get; set; }
        public bool? Status { get; set; }
        [ForeignKey("UserMaster")]
        public int? UserId { get; set; }
        public UserMasterModel UserMaster { get; set; }
    }
}