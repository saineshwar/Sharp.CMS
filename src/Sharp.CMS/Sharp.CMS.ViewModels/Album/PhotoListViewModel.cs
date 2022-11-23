using System.Collections.Generic;
using X.PagedList;

namespace Sharp.CMS.ViewModels.Album
{
    public class PhotoListViewModel
    {
        public int? Page;

        public StaticPagedList<PhotoListGrid> PhotoListGrid { get; set; }

        public string Album { get; set; }
    }
}