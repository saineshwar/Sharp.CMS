using System.Linq;
using Sharp.CMS.Models.Medias;
using Sharp.CMS.ViewModels.MediaAssets;

namespace Sharp.CMS.Data.MediaAssets.Queries
{
    public interface IAlbumQueries
    {
        IQueryable<GridAlbumViewModel> ShowAllAlbums(string sortColumn, string sortColumnDir, string search);
        bool IsAlbumNameExists(string albumname);
        AlbumDataViewModel GetAlbumbyAlbumId(int AlbumId);
        AlbumModel GetAlbum(int AlbumId);
    }
}