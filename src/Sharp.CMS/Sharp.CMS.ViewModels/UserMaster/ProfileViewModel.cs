using System.Collections.Generic;
using Sharp.CMS.ViewModels.Audit;

namespace Sharp.CMS.ViewModels.UserMaster
{
    public class UserProfileViewModel
    {
        public string FullName { get; set; }
        public string Designation { get; set; }
        public string EmailId { get; set; }
        public string MobileNo { get; set; }
        public string Gender { get; set; }
        public string FirstLoginDate { get; set; }
    }

    public class ProfileViewModel
    {
        public UserProfileViewModel Profile { get; set; }

        public List<AuditViewModel> ListofActivites { get; set; }
    }
}