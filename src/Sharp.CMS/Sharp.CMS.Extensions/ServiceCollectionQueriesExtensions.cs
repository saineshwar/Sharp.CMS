using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Sharp.CMS.Data.Audit.Queries;
using Sharp.CMS.Data.CommonMasters.Queries;
using Sharp.CMS.Data.InnerPages.Command;
using Sharp.CMS.Data.InnerPages.Queries;
using Sharp.CMS.Data.MediaAssets.Queries;
using Sharp.CMS.Data.MenuCategory.Queries;
using Sharp.CMS.Data.MenuMaster.Queries;
using Sharp.CMS.Data.NewPage.Command;
using Sharp.CMS.Data.NewPage.Queries;
using Sharp.CMS.Data.Notices.Queries;
using Sharp.CMS.Data.RenderingPages.Queries;
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
            services.AddTransient<INewPageQueries, NewPageQueries>();
            services.AddTransient<INewPageHeaderQueries, NewPageHeaderQueries>();
            services.AddTransient<ICommonMastersQueries, CommonMastersQueries>();
            services.AddTransient<INewPageFooterQueries, NewPageFooterQueries>();
            services.AddTransient<INewContainerQueries, NewContainerQueries>();
            services.AddTransient<IWidgetsQueries, WidgetsQueries>();
            services.AddTransient<IInnerNewPageHeaderQueries, InnerNewPageHeaderQueries>();
            services.AddTransient<IInnerNewPageFooterQueries, InnerNewPageFooterQueries>();
            services.AddTransient<IInnerWidgetsQueries, InnerWidgetsQueries>();
            services.AddTransient<IRenderingPageQueries, RenderingPageQueries>();
            services.AddTransient<IMediaAssetsQueries, MediaAssetsQueries>();
            

            return services;
        }
    }
}