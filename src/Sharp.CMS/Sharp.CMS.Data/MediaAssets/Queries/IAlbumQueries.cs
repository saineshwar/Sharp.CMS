using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
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
        List<SelectListItem>  GetAllAlbum();
        List<AlbumModel> GetAllActiveAlbum();
    }
}