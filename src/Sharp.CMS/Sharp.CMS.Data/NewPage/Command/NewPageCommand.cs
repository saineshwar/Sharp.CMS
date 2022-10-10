using System;
using System.Collections.Generic;
using System.Data;
using System.Transactions;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
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
        private readonly IConfiguration _configuration;
        public NewPageCommand(SharpContext sharpContext, ILogger<NewContainerCommand> logger, IConfiguration configuration)
        {
            _sharpContext = sharpContext;
            _logger = logger;
            _configuration = configuration;
        }

        public bool Add(PageModel pageModel, ContainersModel containersModel, List<AttachmentsViewModel> listofAttachments)
        {
            try
            {
                using var transactionScope = new TransactionScope();

                _sharpContext.PageModel.Add(pageModel);
                _sharpContext.SaveChanges();

                containersModel.PageId = pageModel.PageId;
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
                        PageId = pageModel.PageId,
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
        public bool Update(PageModel pageModel, ContainersModel containersModel, List<AttachmentsViewModel> listofAttachment)
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
                    var attachmentsModel = new AttachmentsModel()
                    {
                        AttachmentId = 0,
                        OriginalAttachmentName = attach.OriginalAttachmentName,
                        GenerateAttachmentName = attach.GenerateAttachmentName,
                        AttachmentType = attach.AttachmentType, 
                        PageId = attach.PageId,
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
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Update :Add");
                return false;
            }

        }

        public bool Deactivate(PageModel pageModel)
        {
            using var transactionScope = new TransactionScope();
            try
            {
                pageModel.IsActive = pageModel.IsActive != true;
                _sharpContext.Entry(pageModel).State = EntityState.Modified;

                _sharpContext.SaveChanges();

                transactionScope.Complete();

                return true;
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "NewPageCommand:Deactivate");
                return false;
            }
        }
        public bool SetDefaultHomePage(int? pageId)
        {
            using SqlConnectionManager sqlDataAccessManager = new SqlConnectionManager(_configuration);
            try
            {

                var (connection, transaction) = sqlDataAccessManager.StartTransaction();
                var param = new DynamicParameters();
                param.Add("@PageId", pageId);
                var result = connection.Execute("Usp_SetDefaultHomePage", param, transaction, 0, CommandType.StoredProcedure);

                if (result > 0)
                {
                    sqlDataAccessManager.Commit();
                    return true;
                }
                else
                {
                    sqlDataAccessManager.Rollback();
                    return false;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}