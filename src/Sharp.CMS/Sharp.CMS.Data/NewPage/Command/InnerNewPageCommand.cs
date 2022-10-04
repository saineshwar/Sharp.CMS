using System.Collections.Generic;
using System.Transactions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.Attachements;
using Sharp.CMS.Models.InnerPage;
using Sharp.CMS.Models.Page;
using Sharp.CMS.ViewModels.Attachments;
using Sharp.CMS.ViewModels.InnerPage;

namespace Sharp.CMS.Data.NewPage.Command
{
    public class InnerNewPageCommand : IInnerNewPageCommand
    {
        private readonly SharpContext _sharpContext;
        private readonly ILogger<InnerNewPageCommand> _logger;
        public InnerNewPageCommand(SharpContext sharpContext, ILogger<InnerNewPageCommand> logger)
        {
            _sharpContext = sharpContext;
            _logger = logger;
        }

        public bool Add(InnerPageModel pageModel, InnerContainersModel containersModel, List<InnerAttachmentsViewModel> listofAttachments)
        {
            try
            {
                using var transactionScope = new TransactionScope();

                _sharpContext.InnerPageModel.Add(pageModel);
                _sharpContext.SaveChanges();

                containersModel.InnerPageId = pageModel.InnerPageId;
                _sharpContext.InnerContainersModel.Add(containersModel);
                _sharpContext.SaveChanges();

                foreach (var attach in listofAttachments)
                {
                    var attachmentsModel = new InnerAttachmentsModel()
                    {
                        InnerAttachmentId = 0,
                        OriginalAttachmentName = attach.OriginalAttachmentName,
                        GenerateAttachmentName = attach.GenerateAttachmentName,
                        AttachmentType = attach.AttachmentType,
                        InnerPageId = pageModel.InnerPageId,
                        ContainersId = containersModel.InnerContainersId,
                        CreatedBy = attach.CreatedBy,
                        CreatedOn = attach.CreatedOn,
                        VirtualPath = attach.VirtualPath,
                        PhysicalPath = attach.PhysicalPath,
                        DirectoryName = attach.DirectoryName
                    };

                    _sharpContext.InnerAttachmentsModel.Add(attachmentsModel);
                    _sharpContext.SaveChanges();
                }

                transactionScope.Complete();


                return true;
            }
            catch (System.Exception ex)
            {

                _logger.LogError(ex, "NewContainerCommand :Add");
                return false;
            }

        }
        public bool Update(InnerPageModel pageModel, InnerContainersModel containersModel, List<InnerAttachmentsViewModel> listofAttachment)
        {
            try
            {
                using var transactionScope = new TransactionScope();

                _sharpContext.Entry(pageModel).State = EntityState.Modified;
                _sharpContext.SaveChanges();

                _sharpContext.Entry(containersModel).State = EntityState.Modified;
                _sharpContext.SaveChanges();

                foreach (var attach in listofAttachment)
                {
                    var attachmentsModel = new InnerAttachmentsModel()
                    {
                        InnerAttachmentId = 0,
                        OriginalAttachmentName = attach.OriginalAttachmentName,
                        GenerateAttachmentName = attach.GenerateAttachmentName,
                        AttachmentType = attach.AttachmentType,
                        InnerPageId = attach.InnerPageId,
                        ContainersId = containersModel.InnerContainersId,
                        CreatedBy = attach.CreatedBy,
                        CreatedOn = attach.CreatedOn,
                        VirtualPath = attach.VirtualPath,
                        PhysicalPath = attach.PhysicalPath,
                        DirectoryName = attach.DirectoryName
                    };

                    _sharpContext.InnerAttachmentsModel.Add(attachmentsModel);
                    _sharpContext.SaveChanges();
                }

                transactionScope.Complete();
                return true;
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Update :Add");
                return false;
            }

        }

        public bool Deactivate(InnerPageModel pageModel)
        {
            try
            {
                using var transactionScope = new TransactionScope();
                pageModel.IsActive = pageModel.IsActive != true;
              
                _sharpContext.Entry(pageModel).State = EntityState.Modified;
                _sharpContext.SaveChanges();

                transactionScope.Complete();
                return true;
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Update :Add");
                return false;
            }

        }
    }
}