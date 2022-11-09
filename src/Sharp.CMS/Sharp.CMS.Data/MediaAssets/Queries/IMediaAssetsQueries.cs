using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
using Sharp.CMS.ViewModels.MediaAssets;

namespace Sharp.CMS.Data.MediaAssets.Queries
{
    public interface IMediaAssetsQueries
    {

        IQueryable<MediaHistoryViewModel> ShowAllUploadedPhotos(string sortColumn, string sortColumnDir, string search);
        List<SelectListItem> ListofMediaTypes();
    }
}