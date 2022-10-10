using System;
using System.Data;
using System.Transactions;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
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
        private readonly IConfiguration _configuration;
        public NewPageFooterCommand(SharpContext sharpContext, ILogger<NewPageFooterCommand> logger, IConfiguration configuration)
        {
            _sharpContext = sharpContext;
            _logger = logger;
            _configuration = configuration;
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

        public bool SetDefaultFooter(int? pageFooterId)
        {
            using SqlConnectionManager sqlDataAccessManager = new SqlConnectionManager(_configuration);
            try
            {

                var (connection, transaction) = sqlDataAccessManager.StartTransaction();
                var param = new DynamicParameters();
                param.Add("@PageFooterId", pageFooterId);
                var result = connection.Execute("Usp_SetDefaultFooter", param, transaction, 0, CommandType.StoredProcedure);

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