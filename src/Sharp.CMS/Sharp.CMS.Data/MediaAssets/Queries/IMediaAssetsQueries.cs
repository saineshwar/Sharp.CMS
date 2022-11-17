using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
using Sharp.CMS.Models.Albums;
using Sharp.CMS.ViewModels.MediaAssets;

namespace Sharp.CMS.Data.MediaAssets.Queries
{
    public interface IMediaAssetsQueries
    {

        IQueryable<MediaHistoryViewModel> ShowAllUploadedPhotos(string sortColumn, string sortColumnDir, string search);
        List<SelectListItem> ListofMediaTypes();

        IQueryable<GridViewAlbumUploadViewModel> ShowAllAlbums(string sortColumn, string sortColumnDir, string search,
            int? albumId);

        GridViewAlbumUploadViewModel GetAlbumDetailsByAlbumId(int? albumId);
    }
}