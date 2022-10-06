using Microsoft.EntityFrameworkCore;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.InnerPage;
using Sharp.CMS.Models.Page;

namespace Sharp.CMS.Data.InnerPages.Command
{
    public class InnerNewPageFooterCommand : IInnerNewPageFooterCommand
    {
        private readonly SharpContext _sharpContext;
        public InnerNewPageFooterCommand(SharpContext sharpContext)
        {
            _sharpContext = sharpContext;
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
    }
}