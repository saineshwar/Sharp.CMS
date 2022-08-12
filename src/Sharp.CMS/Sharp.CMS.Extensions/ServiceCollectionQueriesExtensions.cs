using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Sharp.CMS.Extensions
{
    public static class ServiceCollectionQueriesExtensions
    {
        public static IServiceCollection AddServicesQueries(this IServiceCollection services,
            IConfiguration configuration)
        {
            return services;
        }
    }
}