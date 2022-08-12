using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Sharp.CMS.Extensions
{
    public static class ServiceCollectionCommandExtensions
    {
        public static IServiceCollection AddServicesCommand(this IServiceCollection services,
            IConfiguration configuration)
        {
            return services;
        }
    }
}
