using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.Attachements;
using Sharp.CMS.Models.InnerPage;
using Sharp.CMS.ViewModels.Attachments;
using Sharp.CMS.ViewModels.InnerPage;
using Sharp.CMS.ViewModels.Page;

namespace Sharp.CMS.Data.InnerPages.Queries
{
    public class InnerNewContainerQueries : IInnerNewContainerQueries
    {
        private readonly SharpContext _sharpContext;
        public InnerNewContainerQueries(SharpContext sharpContext)
        {
            _sharpContext = sharpContext;
        }

        public bool CheckContainerNameExists(string containername)
        {
            try
            {
                var queryable = (from page in _sharpContext.InnerContainersModel
                                 where page.ContainerName == containername
                                 select page).Any();

                return queryable;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IQueryable<InnerContainersGrid> ShowAllContainers(string sortColumn, string sortColumnDir, string search)
        {
            try
            {
                var queryable = (from container in _sharpContext.InnerContainersModel
                                 join page in _sharpContext.InnerPageModel on container.InnerPageId equals page.PageId
                                 orderby container.InnerContainersId descending
                                 select new InnerContainersGrid()
                                 {
                                     Status = container.Status == true ? "Active" : "InActive",
                                     ContainerName = container.ContainerName,
                                     PageName = page.PageName,
                                     InnerContainersId = container.InnerContainersId
                                 }
                    );

                if (!(string.IsNullOrEmpty(sortColumn) && string.IsNullOrEmpty(sortColumnDir)))
                {
                    queryable = queryable.OrderBy(sortColumn + " " + sortColumnDir);
                }
                else
                {
                    queryable = queryable.OrderByDescending(x => x.InnerContainersId);
                }

                if (!string.IsNullOrEmpty(search))
                {
                    queryable = queryable.Where(m => m.ContainerName.Contains(search));
                }

                return queryable;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<DisplayInnerAttachmentsViewModel> GetListofAttachmentsbyPageId(int innerPageId)
        {
            try
            {
                var queryable = (from attachments in _sharpContext.InnerAttachmentsModel.AsNoTracking()
                                 where attachments.InnerPageId == innerPageId
                                 select new DisplayInnerAttachmentsViewModel()
                                 {
                                     VirtualPath = attachments.VirtualPath,
                                     DirectoryName = attachments.DirectoryName,
                                     InnerAttachmentId = attachments.InnerAttachmentId,
                                     AttachmentType = attachments.AttachmentType,
                                     OriginalAttachmentName = attachments.OriginalAttachmentName
                                 }).ToList();

                return queryable;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public InnerAttachmentsModel GetAttachmentsByAttachmentId(long innerPageId, long innerAttachmentId)
        {
            try
            {
                var attachmentsinfo = (from attachments in _sharpContext.InnerAttachmentsModel.AsNoTracking()
                                       where attachments.InnerPageId == innerPageId && attachments.InnerAttachmentId == innerAttachmentId
                                       select attachments).FirstOrDefault();
                return attachmentsinfo;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public InnerContainersModel GetCoontainerDetailsbyId(int innerContainersId)
        {
            try
            {
                var queryable = (from page in _sharpContext.InnerContainersModel.AsNoTracking()
                    where page.InnerContainersId == innerContainersId
                                 select page).FirstOrDefault();

                return queryable;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}