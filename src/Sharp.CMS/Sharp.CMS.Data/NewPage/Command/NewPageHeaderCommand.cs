using System;
using System.Data;
using System.Transactions;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
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
        private readonly IConfiguration _configuration;
        public NewPageHeaderCommand(SharpContext sharpContext,
            ILogger<InnerNewPageHeaderCommand> logger,
            IConfiguration configuration)
        {
            _sharpContext = sharpContext;
            _logger = logger;
            _configuration = configuration;
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

        public bool SetDefaultHeader(int? pageHeaderId)
        {
            using SqlConnectionManager sqlDataAccessManager = new SqlConnectionManager(_configuration);
            try
            {

                var (connection, transaction) = sqlDataAccessManager.StartTransaction();
                var param = new DynamicParameters();
                param.Add("@PageHeaderId", pageHeaderId);
                var result = connection.Execute("Usp_SetDefaultHeader", param, transaction, 0, CommandType.StoredProcedure);

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