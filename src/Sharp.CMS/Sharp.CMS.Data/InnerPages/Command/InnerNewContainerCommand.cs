using System.Transactions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Data.NewPage.Command;
using Sharp.CMS.Models.Attachements;
using Sharp.CMS.Models.InnerPage;

namespace Sharp.CMS.Data.InnerPages.Command
{
    public class InnerNewContainerCommand : IInnerNewContainerCommand
    {
        private readonly SharpContext _sharpContext;
        private readonly ILogger<NewContainerCommand> _logger;
        public InnerNewContainerCommand(SharpContext sharpContext, ILogger<NewContainerCommand> logger)
        {
            _sharpContext = sharpContext;
            _logger = logger;
        }

        public bool DeleteAttachmentByAttachmentId(InnerAttachmentsModel attachmentsModel)
        {
            using var transactionScope = new TransactionScope();
            try
            {
                _sharpContext.Entry(attachmentsModel).State = EntityState.Deleted;
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