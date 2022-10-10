using System;
using System.Data;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.InnerPage;
using Sharp.CMS.Models.Page;

namespace Sharp.CMS.Data.InnerPages.Command
{
    public class InnerNewPageFooterCommand : IInnerNewPageFooterCommand
    {
        private readonly SharpContext _sharpContext;
        private readonly IConfiguration _configuration;
        public InnerNewPageFooterCommand(SharpContext sharpContext, IConfiguration configuration)
        {
            _sharpContext = sharpContext;
            _configuration = configuration;
        }

        public int Add(InnerPageFooterModel pageFooterModel)
        {
            _sharpContext.InnerPageFooterModel.Add(pageFooterModel);
            return _sharpContext.SaveChanges();
        }

        public int Update(InnerPageFooterModel pageFooterModel)
        {
            _sharpContext.Entry(pageFooterModel).State = EntityState.Modified;
            return _sharpContext.SaveChanges();
        }

        public int Deactivate(InnerPageFooterModel pageFooterModel)
        {
            pageFooterModel.Status = pageFooterModel.Status != true;
            _sharpContext.Entry(pageFooterModel).State = EntityState.Modified;
            return _sharpContext.SaveChanges();
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