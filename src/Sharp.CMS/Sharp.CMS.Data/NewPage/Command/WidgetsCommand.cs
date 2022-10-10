using System;
using System.Data;
using System.Transactions;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.Page;

namespace Sharp.CMS.Data.NewPage.Command
{
    public class WidgetsCommand : IWidgetsCommand
    {
        private readonly SharpContext _sharpContext;
        private readonly ILogger<NewContainerCommand> _logger;
        private readonly IConfiguration _configuration;
        public WidgetsCommand(SharpContext sharpContext, ILogger<NewContainerCommand> logger, IConfiguration configuration)
        {
            _sharpContext = sharpContext;
            _logger = logger;
            _configuration = configuration;
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

        public bool SetDefaultWidget(int? pageWidgetId)
        {
            using SqlConnectionManager sqlDataAccessManager = new SqlConnectionManager(_configuration);
            try
            {

                var (connection, transaction) = sqlDataAccessManager.StartTransaction();
                var param = new DynamicParameters();
                param.Add("@PageWidgetId", pageWidgetId);
                var result = connection.Execute("Usp_SetDefaultWidget", param, transaction, 0, CommandType.StoredProcedure);

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