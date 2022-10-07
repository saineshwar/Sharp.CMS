using System.Transactions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Data.InnerPages.Command;
using Sharp.CMS.Models.Page;

namespace Sharp.CMS.Data.NewPage.Command
{
    public class NewPageFooterCommand : INewPageFooterCommand
    {
        private readonly SharpContext _sharpContext;
        private readonly ILogger<NewPageFooterCommand> _logger;
        public NewPageFooterCommand(SharpContext sharpContext, ILogger<NewPageFooterCommand> logger)
        {
            _sharpContext = sharpContext;
            _logger = logger;
        }
        public int Add(PageFooterModel pageFooterModel)
        {
            _sharpContext.PageFooterModel.Add(pageFooterModel);
            return _sharpContext.SaveChanges();
        }

        public int Update(PageFooterModel pageFooterModel)
        {
            _sharpContext.Entry(pageFooterModel).State = EntityState.Modified;
            return _sharpContext.SaveChanges();
        }

        public bool Deactivate(PageFooterModel pageFooterModel)
        {
            using var transactionScope = new TransactionScope();
            try
            {
                pageFooterModel.Status = pageFooterModel.Status != true;
                _sharpContext.Entry(pageFooterModel).State = EntityState.Modified;

                _sharpContext.SaveChanges();

                transactionScope.Complete();

                return true;
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "NewPageFooterCommand:Deactivate");
                return false;
            }
        }
    }
}