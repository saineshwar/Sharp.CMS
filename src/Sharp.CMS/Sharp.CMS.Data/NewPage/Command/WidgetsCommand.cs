using System.Transactions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.Page;

namespace Sharp.CMS.Data.NewPage.Command
{
    public class WidgetsCommand : IWidgetsCommand
    {
        private readonly SharpContext _sharpContext;
        private readonly ILogger<NewContainerCommand> _logger;
        public WidgetsCommand(SharpContext sharpContext, ILogger<NewContainerCommand> logger)
        {
            _sharpContext = sharpContext;
            _logger = logger;
        }
        public int Add(PageWidgetsModel pageWidgets)
        {
            _sharpContext.PageWidgetsModel.Add(pageWidgets);
            return _sharpContext.SaveChanges();
        }

        public int Update(PageWidgetsModel pageWidgets)
        {
            _sharpContext.Entry(pageWidgets).State = EntityState.Modified;
            return _sharpContext.SaveChanges();
        }

        public bool Deactivate(PageWidgetsModel pageWidgets)
        {
            using var transactionScope = new TransactionScope();
            try
            {
                _sharpContext.Entry(pageWidgets).State = EntityState.Deleted;
                _sharpContext.SaveChanges();

                transactionScope.Complete();

                return true;
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "WidgetsCommand:Deactivate");
                return false;
            }
        }
    }
}