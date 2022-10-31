using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.Medias;

namespace Sharp.CMS.Data.MediaAssets.Command
{
    public class MediaHistoryCommand : IMediaHistoryCommand
    {
        private readonly SharpContext _sharpContext;
        public MediaHistoryCommand(SharpContext SharpContext)
        {
            _sharpContext = SharpContext;
        }

        public int Add(MediaHistoryModel mediaHistory)
        {
            _sharpContext.MediaHistoryModel.Add(mediaHistory);
            return _sharpContext.SaveChanges();
        }
    }
}