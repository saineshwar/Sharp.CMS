using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.Medias;

namespace Sharp.CMS.Data.MediaAssets.Command
{
    public class AlbumCommand : IAlbumCommand
    {
        private readonly SharpContext _sharpContext;
        public AlbumCommand(SharpContext SharpContext)
        {
            _sharpContext = SharpContext;
        }

        public bool Add(AlbumModel albumModel)
        {
            _sharpContext.AlbumModel.Add(albumModel);
            var result = _sharpContext.SaveChanges();
            if (result > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}