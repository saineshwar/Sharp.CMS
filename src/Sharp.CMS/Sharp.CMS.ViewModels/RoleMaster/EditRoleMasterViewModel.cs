using System.ComponentModel.DataAnnotations;

namespace Sharp.CMS.ViewModels.RoleMaster
{
    public class EditRoleMasterViewModel
    {
        [Required(ErrorMessage = "Enter RoleName")]
        public string RoleName { get; set; }

        [Required(ErrorMessage = "Choose Status")]
        public bool Status { get; set; }

        public int RoleId { get; set; }
    }
}