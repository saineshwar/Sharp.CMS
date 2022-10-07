using System.Transactions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Data.InnerPages.Command;
using Sharp.CMS.Models.InnerPage;
using Sharp.CMS.Models.Page;

namespace Sharp.CMS.Data.NewPage.Command
{
    public class NewPageHeaderCommand : INewPageHeaderCommand
    {
        private readonly SharpContext _sharpContext;
        private readonly ILogger<InnerNewPageHeaderCommand> _logger;
        public NewPageHeaderCommand(SharpContext sharpContext, ILogger<InnerNewPageHeaderCommand> logger)
        {
            _sharpContext = sharpContext;
            _logger = logger;
        }
        public int Add(PageHeaderModel pageHeaderModel)
        {
            _sharpContext.PageHeaderModel.Add(pageHeaderModel);
            return _sharpContext.SaveChanges();
        }

        public int Update(PageHeaderModel pageHeaderModel)
        {
            _sharpContext.Entry(pageHeaderModel).State = EntityState.Modified;
            return _sharpContext.SaveChanges();
        }

        public bool Deactivate(PageHeaderModel pageHeaderModel)
        {
            using var transactionScope = new TransactionScope();
            try
            {
                pageHeaderModel.Status = pageHeaderModel.Status != true;
                _sharpContext.Entry(pageHeaderModel).State = EntityState.Modified;

                _sharpContext.SaveChanges();

                transactionScope.Complete();

                return true;
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "NewPageHeaderCommand:Deactivate");
                return false;
            }
        }
    }
}