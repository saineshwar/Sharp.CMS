using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using Sharp.CMS.Data.Data;
using Sharp.CMS.ViewModels.MediaAssets;

namespace Sharp.CMS.Data.MediaAssets.Queries
{
    public class AlbumQueries : IAlbumQueries
    {
        private readonly SharpContext _sharpContext;
        public AlbumQueries(SharpContext sharpContext)
        {
            _sharpContext = sharpContext;
        }


        public IQueryable<GridAlbumViewModel> ShowAllAlbums(string sortColumn, string sortColumnDir, string search)
        {
            try
            {
                var queryable = (from page in _sharpContext.AlbumModel

                                 orderby page.AlbumId descending
                                 select new GridAlbumViewModel()
                                 {
                                     IsActive = page.IsActive == true ? "Active" : "InActive",
                                     AlbumNameLL = page.AlbumNameLL,
                                     AlbumName = page.AlbumName,
                                     AlbumId = page.AlbumId,
                                     AlbumImagePath = page.AlbumImagePath
                                 }
                    );

                if (!(string.IsNullOrEmpty(sortColumn) && string.IsNullOrEmpty(sortColumnDir)))
                {
                    queryable = queryable.OrderBy(sortColumn + " " + sortColumnDir);
                }
                else
                {
                    queryable = queryable.OrderByDescending(x => x.AlbumId);
                }

                if (!string.IsNullOrEmpty(search))
                {
                    queryable = queryable.Where(m => m.AlbumName.Contains(search));
                }

                return queryable;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool IsAlbumNameExists(string albumname)
        {
            var queryable = (from album in _sharpContext.AlbumModel
                             where album.Album == albumname
                             orderby album.AlbumId descending
                             select album).Count();

            return queryable > 0;
        }
    }
}