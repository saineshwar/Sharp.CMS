using Sharp.CMS.Models.Medias;

namespace Sharp.CMS.Data.MediaAssets.Command
{
    public interface IMediaHistoryCommand
    {
        int Add(MediaHistoryModel mediaHistory);
    }
}