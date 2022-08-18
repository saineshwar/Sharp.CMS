using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Sharp.CMS.Data.RoleMaster.Queries;
using Sharp.CMS.Data.UserMaster.Queries;

namespace Sharp.CMS.Extensions
{
    public static class ServiceCollectionQueriesExtensions
    {
        public static IServiceCollection AddServicesQueries(this IServiceCollection services,
            IConfiguration configuration)
        {

            services.AddTransient<IUserMasterQueries, UserMasterQueries>();
            services.AddTransient<IRoleQueries, RoleQueries>();
            services.AddTransient<IAssignedRolesQueries, AssignedRolesQueries>();
            return services;
        }
    }
}