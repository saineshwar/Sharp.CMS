using System.Collections.Generic;
using System.Transactions;
using Microsoft.Extensions.Logging;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.Attachements;
using Sharp.CMS.Models.Page;
using Sharp.CMS.ViewModels.Attachments;
using Sharp.CMS.ViewModels.Page;

namespace Sharp.CMS.Data.NewPage.Command
{
    public class NewContainerCommand : INewContainerCommand
    {
        private readonly SharpContext _sharpContext;
        private readonly ILogger<NewContainerCommand> _logger;
        public NewContainerCommand(SharpContext sharpContext, ILogger<NewContainerCommand> logger)
        {
            _sharpContext = sharpContext;
            _logger = logger;
        }
        public bool Add(ContainersModel containersModel, List<AttachmentsViewModel> listofAttachment)
        {
            try
            {
                using var transactionScope = new TransactionScope();

                _sharpContext.ContainersModel.Add(containersModel);
                foreach (var attach in listofAttachment)
                {
                    var attachmentsModel = new AttachmentsModel()
                    {
                        AttachmentId = 0,
                        OriginalAttachmentName = attach.OriginalAttachmentName,
                        GenerateAttachmentName = attach.GenerateAttachmentName,
                        AttachmentType = attach.AttachmentType,
                        PageId = attach.PageId,
                        CreatedBy = attach.CreatedBy,
                        CreatedOn = attach.CreatedOn,
                        VirtualPath = attach.VirtualPath,
                        PhysicalPath = attach.PhysicalPath,
                        DirectoryName = attach.DirectoryName
                    };

                    _sharpContext.AttachmentsModel.Add(attachmentsModel);
                    _sharpContext.SaveChanges();
                }

                _sharpContext.SaveChanges();
                transactionScope.Complete();
                return true;
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "NewContainerCommand :Add");
                return false;
            }

        }
    }
}