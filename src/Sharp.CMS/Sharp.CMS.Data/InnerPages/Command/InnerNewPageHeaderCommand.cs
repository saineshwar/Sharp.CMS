using System.Transactions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Data.NewPage.Command;
using Sharp.CMS.Models.InnerPage;
using Sharp.CMS.Models.Page;

namespace Sharp.CMS.Data.InnerPages.Command
{
    public class InnerNewPageHeaderCommand : IInnerNewPageHeaderCommand
    {
        private readonly SharpContext _sharpContext;
        private readonly ILogger<InnerNewPageHeaderCommand> _logger;
        public InnerNewPageHeaderCommand(SharpContext sharpContext, ILogger<InnerNewPageHeaderCommand> logger)
        {
            _sharpContext = sharpContext;
            _logger = logger;
        }
        public int Add(InnerPageHeaderModel pageHeaderModel)
        {
            _sharpContext.InnerPageHeaderModel.Add(pageHeaderModel);
            return _sharpContext.SaveChanges();
        }

        public int Update(InnerPageHeaderModel pageHeaderModel)
        {
            _sharpContext.Entry(pageHeaderModel).State = EntityState.Modified;
            return _sharpContext.SaveChanges();
        }

        public bool Delete(InnerPageHeaderModel innerPageHeader)
        {
            using var transactionScope = new TransactionScope();
            try
            {
                innerPageHeader.Status = innerPageHeader.Status != true;
                _sharpContext.Entry(innerPageHeader).State = EntityState.Modified;

                _sharpContext.SaveChanges();

                transactionScope.Complete();

                return true;
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "InnerNewPageHeaderCommand:Delete");
                return false;
            }
        }
    }
}