
using Sharp.CMS.Models.Audit;

namespace Sharp.CMS.Data.Audit.Command
{
    public interface IAuditCommand
    {
        void InsertAuditData(AuditModel objaudittb);
    }
}