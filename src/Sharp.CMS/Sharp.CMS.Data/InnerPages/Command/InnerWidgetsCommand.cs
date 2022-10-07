using System.Transactions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Data.NewPage.Command;
using Sharp.CMS.Models.InnerPage;
using Sharp.CMS.Models.Page;

namespace Sharp.CMS.Data.InnerPages.Command
{
    public class InnerWidgetsCommand : IInnerWidgetsCommand
    {
        private readonly SharpContext _sharpContext;
        private readonly ILogger<NewContainerCommand> _logger;
        public InnerWidgetsCommand(SharpContext sharpContext, ILogger<NewContainerCommand> logger)
        {
            _sharpContext = sharpContext;
            _logger = logger;
        }
        public int Add(InnerPageWidgetsModel pageWidgets)
        {
            _sharpContext.InnerPageWidgetsModel.Add(pageWidgets);
            return _sharpContext.SaveChanges();
        }

        public int Update(InnerPageWidgetsModel pageWidgets)
        {
            _sharpContext.Entry(pageWidgets).State = EntityState.Modified;
            return _sharpContext.SaveChanges();
        }

        public bool Deactivate(InnerPageWidgetsModel pageWidgets)
        {
            using var transactionScope = new TransactionScope();
            try
            {
                pageWidgets.Status = pageWidgets.Status != true;
                _sharpContext.Entry(pageWidgets).State = EntityState.Modified;

                _sharpContext.SaveChanges();

                transactionScope.Complete();

                return true;
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "NewContainerCommand:DeleteAttachmentByAttachmentId");
                return false;
            }
        }
    }
}