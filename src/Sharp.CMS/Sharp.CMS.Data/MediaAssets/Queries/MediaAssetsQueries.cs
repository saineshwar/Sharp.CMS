using System;
using System.Linq;
using Sharp.CMS.Data.Data;
using Sharp.CMS.ViewModels.MenuCategory;
using System.Linq.Dynamic.Core;
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
    }
}