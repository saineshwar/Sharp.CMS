using System;
using System.Collections.Generic;
using System.Linq;
using Sharp.CMS.Data.Data;
using Sharp.CMS.ViewModels.MenuCategory;
using System.Linq.Dynamic.Core;
using Microsoft.AspNetCore.Mvc.Rendering;
using Sharp.CMS.Models.Albums;
using Sharp.CMS.ViewModels.MediaAssets;

namespace Sharp.CMS.Data.MediaAssets.Queries
{
    public class MediaAssetsQueries : IMediaAssetsQueries
    {
        private readonly SharpContext _sharpContext;
        public MediaAssetsQueries(SharpContext sharpContext)
        {
            _sharpContext = sharpContext;
        }

        public IQueryable<MediaHistoryViewModel> ShowAllUploadedPhotos(string sortColumn, string sortColumnDir, string search)
        {
            try
            {
                var queryabledata = (from mediaHistory in _sharpContext.MediaHistoryModel

                                     select new MediaHistoryViewModel()
                                     {
                                         MediaHistoryId = mediaHistory.MediaHistoryId,
                                         FileName = mediaHistory.FileName,
                                         FilePath = mediaHistory.FilePath,
                                         CreatedOn = mediaHistory.CreatedOn,
                                         CreatedBy = mediaHistory.CreatedBy
                                     }
                    );

                if (!(string.IsNullOrEmpty(sortColumn) && string.IsNullOrEmpty(sortColumnDir)))
                {
                    queryabledata = queryabledata.OrderBy(sortColumn + " " + sortColumnDir);
                }
                else
                {
                    queryabledata = queryabledata.OrderByDescending(x => x.MediaHistoryId);
                }
                if (!string.IsNullOrEmpty(search))
                {
                    queryabledata = queryabledata.Where(m => m.FileName.Contains(search) || m.FileName.Contains(search));
                }

                return queryabledata;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<SelectListItem> ListofMediaTypes()
        {
            try
            {
                var queryable = (from page in _sharpContext.MediaTypesModel
                                 select new SelectListItem
                                 {
                                     Value = page.MediaTypeId.ToString(),
                                     Text = page.MediaTypeName
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

        public IQueryable<GridViewAlbumUploadViewModel> ShowAllAlbums(string sortColumn, string sortColumnDir, string search, int? albumId)
        {
            try
            {
                var queryable = (from albumupload in _sharpContext.AlbumUploadModel
                                 join user in _sharpContext.UserMasters on albumupload.CreatedBy equals user.UserId
                                 join album in _sharpContext.AlbumModel on albumupload.AlbumId equals album.AlbumId
                                 orderby albumupload.AlbumId descending
                                 select new GridViewAlbumUploadViewModel()
                                 {
                                     IsActive = albumupload.IsActive == true ? "Active" : "InActive",
                                     AlbumUploadId = albumupload.AlbumUploadId,
                                     AlbumName = album.AlbumName,
                                     VirtualPath = albumupload.VirtualPath,
                                     AlbumId = albumupload.AlbumId,
                                     CreatedBy = $"{user.FirstName}{user.LastName}",
                                     CreatedOn = albumupload.CreatedOn,
                                     FileName = albumupload.FileName
                                 }
                    );

                if (albumId != null)
                {
                    queryable = queryable.Where(p => p.AlbumId == albumId);
                }

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
                    queryable = queryable.Where(m => m.FileName.Contains(search));
                }

                return queryable;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public ShowAlbumViewModel GetAlbumDetailsByAlbumId(int? albumId)
        {
            try
            {
                var queryable = (from albumupload in _sharpContext.AlbumUploadModel
                    where albumupload.AlbumId == albumId
                    join user in _sharpContext.UserMasters on albumupload.CreatedBy equals user.UserId
                    join album in _sharpContext.AlbumModel on albumupload.AlbumId equals album.AlbumId
                    orderby albumupload.AlbumId descending
                    select new ShowAlbumViewModel()
                    {
                        IsActive = albumupload.IsActive == true ? "Active" : "InActive",
                        AlbumUploadId = albumupload.AlbumUploadId,
                        AlbumName = album.AlbumName,
                        AlbumId = albumupload.AlbumId,
                        CreatedBy = $"{user.FirstName}{user.LastName}",
                        CreatedOn = albumupload.CreatedOn,
                        ThumbnailPath = album.ThumbnailPath,
                        ThumbnailFileName = album.ThumbnailFileName,
                        ThumbnailFileExtension = album.ThumbnailFileExtension
                    }).FirstOrDefault();

                return queryable;

            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}