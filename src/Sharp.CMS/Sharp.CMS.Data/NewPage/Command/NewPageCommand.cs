using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.Page;
using Sharp.CMS.ViewModels.Page;

namespace Sharp.CMS.Data.NewPage.Command
{
    public class NewPageCommand : INewPageCommand
    {
        private readonly SharpContext _sharpContext;
        public NewPageCommand(SharpContext sharpContext)
        {
            _sharpContext = sharpContext;
        }

        public int Add(PageModel PageModel)
        {
            _sharpContext.PageModel.Add(PageModel);
            return _sharpContext.SaveChanges();
        }
    }
}