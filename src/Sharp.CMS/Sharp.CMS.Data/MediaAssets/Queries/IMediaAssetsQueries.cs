using System.Linq;
using Sharp.CMS.ViewModels.MediaAssets;

namespace Sharp.CMS.Data.MediaAssets.Queries
{
    public interface IMediaAssetsQueries
    {

        IQueryable<MediaHistoryViewModel> ShowAllUploadedPhotos(string sortColumn, string sortColumnDir, string search);
        IQueryable<GridAlbumViewModel> ShowAllAlbums(string sortColumn, string sortColumnDir, string search);
    }
}