using Microsoft.EntityFrameworkCore;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.Page;

namespace Sharp.CMS.Data.NewPage.Command
{
    public class NewPageHeaderCommand : INewPageHeaderCommand
    {
        private readonly SharpContext _sharpContext;
        public NewPageHeaderCommand(SharpContext sharpContext)
        {
            _sharpContext = sharpContext;
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
    }
}