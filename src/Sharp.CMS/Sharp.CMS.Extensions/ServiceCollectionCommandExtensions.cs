using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Sharp.CMS.Data.Audit.Command;
using Sharp.CMS.Data.MenuCategory.Command;
using Sharp.CMS.Data.MenuMaster.Command;
using Sharp.CMS.Data.MenuOrdering.Command;
using Sharp.CMS.Data.NewPage.Command;
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
            services.AddTransient<IOrderingCommand, OrderingCommand>();
            services.AddTransient<INewPageCommand, NewPageCommand>();
            services.AddTransient<INewPageHeaderCommand, NewPageHeaderCommand>();
            services.AddTransient<INewPageFooterCommand, NewPageFooterCommand>();
            services.AddTransient<INewContainerCommand, NewContainerCommand>();
            services.AddTransient<IWidgetsCommand, WidgetsCommand>();
            return services;
        }
    }
}
