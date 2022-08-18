using System.ComponentModel.DataAnnotations;

namespace Sharp.CMS.ViewModels.RoleMaster
{
    public class RoleMasterViewModel
    {
        [Required(ErrorMessage = "Enter RoleName")]
        public string RoleName { get; set; }

        [Required(ErrorMessage = "Choose Status")]
        public bool Status { get; set; }
    }
}