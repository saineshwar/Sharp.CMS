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
    public class InnerNewPageHeaderCommand : IInnerNewPageHeaderCommand
    {
        private readonly SharpContext _sharpContext;
        private readonly ILogger<InnerNewPageHeaderCommand> _logger;
        private readonly IConfiguration _configuration;
        public InnerNewPageHeaderCommand(SharpContext sharpContext, ILogger<InnerNewPageHeaderCommand> logger, IConfiguration configuration)
        {
            _sharpContext = sharpContext;
            _logger = logger;
            _configuration = configuration;
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

        public bool Deactivate(InnerPageHeaderModel innerPageHeader)
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

        public bool SetDefaultHeader(int? pageHeaderId)
        {
            using SqlConnectionManager sqlDataAccessManager = new SqlConnectionManager(_configuration);
            try
            {

                var (connection, transaction) = sqlDataAccessManager.StartTransaction();
                var param = new DynamicParameters();
                param.Add("@PageHeaderId", pageHeaderId);
                var result = connection.Execute("Usp_SetDefaultInnerPageHeader", param, transaction, 0, CommandType.StoredProcedure);

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