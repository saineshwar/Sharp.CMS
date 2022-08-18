using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Sharp.CMS.Data.RoleMaster.Command;
using Sharp.CMS.Data.UserMaster.Command;

namespace Sharp.CMS.Extensions
{
    public static class ServiceCollectionCommandExtensions
    {
        public static IServiceCollection AddServicesCommand(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddTransient<IUserMasterCommand, UserMasterCommand>();
            services.AddTransient<IRoleCommand, RoleCommand>();
            return services;
        }
    }
}
