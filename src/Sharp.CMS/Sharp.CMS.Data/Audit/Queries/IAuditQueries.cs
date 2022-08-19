using System.Collections.Generic;
using Sharp.CMS.ViewModels.Audit;


namespace Sharp.CMS.Data.Audit.Queries
{
    public interface IAuditQueries
    {
        List<AuditViewModel> GetUserActivity(long? userId);
    }
}