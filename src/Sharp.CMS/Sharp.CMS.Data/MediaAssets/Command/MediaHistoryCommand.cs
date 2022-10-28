using Sharp.CMS.Data.Data;

namespace Sharp.CMS.Data.MediaAssets.Command
{
    public class MediaHistoryCommand
    {
        private readonly SharpContext _sharpContext;
        public MediaHistoryCommand(SharpContext SharpContext)
        {
            _sharpContext = SharpContext;
        }

        //public int Add(MenuCategoryModel category)
        //{
        //    _sharpContext.MenuCategorys.Add(category);
        //    return _sharpContext.SaveChanges();
        //}
    }
}