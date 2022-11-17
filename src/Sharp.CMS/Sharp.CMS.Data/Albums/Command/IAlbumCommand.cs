using Sharp.CMS.Models.Albums;

namespace Sharp.CMS.Data.Albums.Command
{
    public interface IAlbumUploadCommand
    {
        int Add(AlbumUploadModel albumUpload);
    }
}