using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using Microsoft.AspNetCore.Mvc.Rendering;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.Medias;
using Sharp.CMS.ViewModels.Album;
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

        public AlbumDataViewModel GetAlbumbyAlbumId(int AlbumId)
        {
            try
            {
                var queryable = (from album in _sharpContext.AlbumModel
                                 where album.AlbumId == AlbumId
                                 orderby album.AlbumId descending
                                 select new AlbumDataViewModel()
                                 {
                                     IsActive = album.IsActive == true ? "1" : "0",
                                     Album = album.Album,
                                     AlbumId = album.AlbumId,
                                     AlbumImagePath = album.AlbumImagePath,
                                     AlbumName = album.AlbumName,
                                     AlbumNameLL = album.AlbumNameLL,
                                     MediaTypeId = album.MediaTypeId
                                 }).FirstOrDefault();
                return queryable;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public AlbumModel GetAlbum(int AlbumId)
        {
            try
            {
                var queryable = (from album in _sharpContext.AlbumModel
                                 where album.AlbumId == AlbumId
                                 orderby album.AlbumId descending
                                 select album).FirstOrDefault();
                return queryable;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<SelectListItem> GetAllAlbum()
        {
            try
            {
                var queryable = (from album in _sharpContext.AlbumModel
                                 where album.IsActive == true
                                 orderby album.AlbumId descending
                                 select new SelectListItem()
                                 {
                                     Value = album.AlbumId.ToString(),
                                     Text = album.Album
                                 }).ToList();
                queryable.Insert(0, new SelectListItem()
                {
                    Value = "",
                    Text = "-----Select-----"
                });
                return queryable;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<AlbumModel> GetAllActiveAlbum()
        {
            try
            {
                var queryable = (from album in _sharpContext.AlbumModel
                                 where album.IsActive == true
                                 orderby album.AlbumId descending
                                 select album).ToList();
                return queryable;

            }
            catch (Exception)
            {
                throw;
            }
        }


        public IQueryable<PhotoListGrid> GetAllAlbumPhotos(int page, int pagesize, int albumId)
        {
            try
            {
                var queryable = (from albumUpload in _sharpContext.AlbumUploadModel
                                 join album in _sharpContext.AlbumModel on albumUpload.AlbumId equals album.AlbumId
                                 orderby albumUpload.CreatedOn descending
                                 select new PhotoListGrid()
                                 {
                                     Album = album.AlbumName,
                                     AlbumId = album.AlbumId,
                                     VirtualPath = albumUpload.VirtualPath,
                                     FileName = albumUpload.FileName,
                                     AlbumUploadId = albumUpload.AlbumUploadId,
                                     AlbumNameLL = album.AlbumNameLL
                                 }
                    );


                queryable = queryable.OrderByDescending(x => x.AlbumId);



                queryable = queryable.Where(m => m.AlbumId == albumId);

                return queryable.Skip(page).Take(pagesize);

            }
            catch (Exception)
            {
                throw;
            }
        }

        public int GetAllAlbumPhotosCount(int page, int pagesize, int albumId)
        {
            try
            {
                var queryable = (from albumUpload in _sharpContext.AlbumUploadModel
                                 join album in _sharpContext.AlbumModel on albumUpload.AlbumId equals album.AlbumId
                                 orderby albumUpload.CreatedOn descending
                                 select new PhotoListGrid()
                                 {
                                     Album = album.AlbumName,
                                     AlbumId = album.AlbumId,
                                     VirtualPath = albumUpload.VirtualPath,
                                     FileName = albumUpload.FileName,
                                     AlbumUploadId = albumUpload.AlbumUploadId,
                                     AlbumNameLL = album.AlbumNameLL
                                 }
                    );


                queryable = queryable.OrderByDescending(x => x.AlbumId);
                queryable = queryable.Where(m => m.AlbumId == albumId);


                return queryable.Count();

            }
            catch (Exception)
            {
                throw;
            }
        }

        public int GetAlbumIdbyAlbumName(string albumname)
        {
            var queryable = (from album in _sharpContext.AlbumModel
                             where album.Album == albumname
                             orderby album.AlbumId descending
                             select album.AlbumId).FirstOrDefault();

            return queryable;
        }

    }
}