using System;
using System.Data;
using System.Transactions;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
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
        private readonly IConfiguration _configuration;
        public InnerWidgetsCommand(SharpContext sharpContext, ILogger<NewContainerCommand> logger, IConfiguration configuration)
        {
            _sharpContext = sharpContext;
            _logger = logger;
            _configuration = configuration;
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

        public bool SetDefaultWidget(int? pageWidgetId)
        {
            using SqlConnectionManager sqlDataAccessManager = new SqlConnectionManager(_configuration);
            try
            {

                var (connection, transaction) = sqlDataAccessManager.StartTransaction();
                var param = new DynamicParameters();
                param.Add("@PageWidgetId", pageWidgetId);
                var result = connection.Execute("Usp_SetDefaultInnerPageWidget", param, transaction, 0, CommandType.StoredProcedure);

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