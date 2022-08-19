using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Sharp.CMS.Data.Audit.Command;
using Sharp.CMS.Data.MenuCategory.Command;
using Sharp.CMS.Data.MenuMaster.Command;
using Sharp.CMS.Data.Notices.Command;
using Sharp.CMS.Data.RoleMaster.Command;
using Sharp.CMS.Data.UserMaster.Command;

namespace Sharp.CMS.Extensions
{
    public static class ServiceCollectionCommandExtensions
    {
        public static IServiceCollection AddServicesCommand(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddTransient<IAuditCommand, AuditCommand>();
            services.AddTransient<IUserMasterCommand, UserMasterCommand>();
            services.AddTransient<IRoleCommand, RoleCommand>();
            services.AddTransient<IMenuMasterCommand, MenuMasterCommand>();
            services.AddTransient<IMenuCategoryCommand, MenuCategoryCommand>();
            services.AddTransient<INoticeCommand, NoticeCommand>();
            services.AddTransient<INoticeDetailsCommand, NoticeDetailsCommand>();
            return services;
        }
    }
}
