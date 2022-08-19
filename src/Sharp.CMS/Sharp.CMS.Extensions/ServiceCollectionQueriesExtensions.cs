using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Sharp.CMS.Data.Audit.Queries;
using Sharp.CMS.Data.MenuCategory.Queries;
using Sharp.CMS.Data.MenuMaster.Queries;
using Sharp.CMS.Data.Notices.Queries;
using Sharp.CMS.Data.RoleMaster.Queries;
using Sharp.CMS.Data.UserMaster.Queries;

namespace Sharp.CMS.Extensions
{
    public static class ServiceCollectionQueriesExtensions
    {
        public static IServiceCollection AddServicesQueries(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddTransient<IMenuCategoryQueries, MenuCategoryQueries>();
            services.AddTransient<IMenuMasterQueries, MenuMasterQueries>();
            services.AddTransient<IUserMasterQueries, UserMasterQueries>();
            services.AddTransient<IRoleQueries, RoleQueries>();
            services.AddTransient<IAssignedRolesQueries, AssignedRolesQueries>();
            services.AddTransient<IAuditQueries, AuditQueries>();
            services.AddTransient<INoticeQueries, NoticeQueries>();
            return services;
        }
    }
}