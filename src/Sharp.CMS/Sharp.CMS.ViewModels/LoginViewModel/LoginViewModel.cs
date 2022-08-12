using System.ComponentModel.DataAnnotations;

namespace Sharp.CMS.ViewModels.LoginViewModel
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Enter UserId")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Enter Password")]
        public string Password { get; set; }
        public string Hdrandomtoken { get; set; }
    }

}