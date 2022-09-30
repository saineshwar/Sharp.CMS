﻿using Microsoft.EntityFrameworkCore;
using Sharp.CMS.Models.Attachements;
using Sharp.CMS.Models.Audit;
using Sharp.CMS.Models.MenuCategory;
using Sharp.CMS.Models.MenuMaster;
using Sharp.CMS.Models.Notices;
using Sharp.CMS.Models.Page;
using Sharp.CMS.Models.RoleMaster;
using Sharp.CMS.Models.StatusMaster;
using Sharp.CMS.Models.UserMaster;

namespace Sharp.CMS.Data.Data
{
    public class SharpContext : DbContext
    {
        public SharpContext(DbContextOptions<SharpContext> options) : base(options)
        {

        }
        public DbSet<AuditModel> AuditModel { get; set; }
        public DbSet<MenuCategoryModel> MenuCategorys { get; set; }
        public DbSet<RoleMasterModel> RoleMasters { get; set; }
        public DbSet<MenuMasterModel> MenuMasters { get; set; }
        public DbSet<UserMasterModel> UserMasters { get; set; }
        public DbSet<AssignedRolesModel> AssignedRoles { get; set; }
        public DbSet<Notice> Notice { get; set; }
        public DbSet<NoticeDetails> NoticeDetails { get; set; }
        public DbSet<PageModel> PageModel { get; set; }
        public DbSet<PageHeaderModel> PageHeaderModel { get; set; }
        public DbSet<PageFooterModel> PageFooterModel { get; set; }
        public DbSet<PageDetailsModel> PageDetailsModel { get; set; }
        public DbSet<StatusMasterModel> StatusMaster { get; set; }
        public DbSet<ContainersModel> ContainersModel { get; set; }
        public DbSet<AttachmentsModel> AttachmentsModel { get; set; }
        public DbSet<PageWidgetsModel> PageWidgetsModel { get; set; }
    }
}