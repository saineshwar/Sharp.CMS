using Microsoft.EntityFrameworkCore;
using Sharp.CMS.Models.RoleMaster;
using Sharp.CMS.Models.UserMaster;

namespace Sharp.CMS.Data.Data
{
    public class SharpContext : DbContext
    {
        public SharpContext(DbContextOptions<SharpContext> options) : base(options)
        {

        }

        public DbSet<RoleMasterModel> RoleMasters { get; set; }
        public DbSet<UserMasterModel> UserMasters { get; set; }
        public DbSet<AssignedRolesModel> AssignedRoles { get; set; }
    }
}