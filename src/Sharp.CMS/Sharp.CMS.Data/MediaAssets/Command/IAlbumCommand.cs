using Sharp.CMS.Models.Medias;

namespace Sharp.CMS.Data.MediaAssets.Command
{
    public interface IAlbumCommand
    {
        bool Add(AlbumModel albumModel);
    }
}