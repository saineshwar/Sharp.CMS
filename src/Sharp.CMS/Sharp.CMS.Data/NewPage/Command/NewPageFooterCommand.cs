using Microsoft.EntityFrameworkCore;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.Page;

namespace Sharp.CMS.Data.NewPage.Command
{
    public class NewPageFooterCommand : INewPageFooterCommand
    {
        private readonly SharpContext _sharpContext;
        public NewPageFooterCommand(SharpContext sharpContext)
        {
            _sharpContext = sharpContext;
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
    }
}