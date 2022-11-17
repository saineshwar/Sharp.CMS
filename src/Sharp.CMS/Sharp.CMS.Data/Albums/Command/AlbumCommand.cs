using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.Albums;
using Sharp.CMS.Models.InnerPage;

namespace Sharp.CMS.Data.Albums.Command
{
    public class AlbumUploadCommand : IAlbumUploadCommand
    {
        private readonly SharpContext _sharpContext;
        public AlbumUploadCommand(SharpContext sharpContext)
        {
            _sharpContext = sharpContext;
        }

        public int Add(AlbumUploadModel albumUpload)
        {
            _sharpContext.AlbumUploadModel.Add(albumUpload);
            return _sharpContext.SaveChanges();
        }


    }
}