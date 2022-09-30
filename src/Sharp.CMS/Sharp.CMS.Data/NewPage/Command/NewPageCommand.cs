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
    public class NewPageCommand : INewPageCommand
    {
        private readonly SharpContext _sharpContext;
        private readonly ILogger<NewContainerCommand> _logger;
        public NewPageCommand(SharpContext sharpContext, ILogger<NewContainerCommand> logger)
        {
            _sharpContext = sharpContext;
            _logger = logger;
        }

        public bool Add(PageModel PageModel, ContainersModel containersModel, List<AttachmentsViewModel> listofAttachments)
        {
            try
            {
                using var transactionScope = new TransactionScope();

                _sharpContext.PageModel.Add(PageModel);
                _sharpContext.SaveChanges();

                containersModel.PageId = PageModel.PageId;
                _sharpContext.ContainersModel.Add(containersModel);
                _sharpContext.SaveChanges();

                foreach (var attach in listofAttachments)
                {
                    var attachmentsModel = new AttachmentsModel()
                    {
                        AttachmentId = 0,
                        OriginalAttachmentName = attach.OriginalAttachmentName,
                        GenerateAttachmentName = attach.GenerateAttachmentName,
                        AttachmentType = attach.AttachmentType,
                        PageId = PageModel.PageId,
                        ContainersId = containersModel.ContainersId,
                        CreatedBy = attach.CreatedBy,
                        CreatedOn = attach.CreatedOn,
                        VirtualPath = attach.VirtualPath,
                        PhysicalPath = attach.PhysicalPath,
                        DirectoryName = attach.DirectoryName
                    };

                    _sharpContext.AttachmentsModel.Add(attachmentsModel);
                    _sharpContext.SaveChanges();
                }

                transactionScope.Complete();


                return true;
            }
            catch (System.Exception ex )
            {

                _logger.LogError(ex, "NewContainerCommand :Add");
                return false;
            }



        }
    }
}