using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.Audit;

namespace Sharp.CMS.Data.Audit.Command
{
    public class AuditCommand : IAuditCommand
    {
        private readonly SharpContext _bugPointContext;
        public AuditCommand(SharpContext sharpContext)
        {
            _bugPointContext = sharpContext;
        }

        public void InsertAuditData(AuditModel objaudittb)
        {
            try
            {
                _bugPointContext.AuditModel.Add(objaudittb);
                _bugPointContext.SaveChanges();

            }
            catch (System.Exception)
            {
                throw;
            }
        }
    }
}