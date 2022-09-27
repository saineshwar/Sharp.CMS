using Sharp.CMS.Data.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Net.Mail;
using Microsoft.EntityFrameworkCore;
using Sharp.CMS.Models.Attachements;
using Sharp.CMS.Models.Page;
using Sharp.CMS.ViewModels.Attachments;
using Sharp.CMS.ViewModels.Page;

namespace Sharp.CMS.Data.NewPage.Queries
{
    public class NewContainerQueries : INewContainerQueries
    {
        private readonly SharpContext _sharpContext;
        public NewContainerQueries(SharpContext sharpContext)
        {
            _sharpContext = sharpContext;
        }

        public bool CheckContainerNameExists(string containername)
        {
            try
            {
                var queryable = (from page in _sharpContext.ContainersModel
                                 where page.ContainerName == containername
                                 select page).Any();

                return queryable;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IQueryable<ContainersGrid> ShowAllContainers(string sortColumn, string sortColumnDir, string search)
        {
            try
            {
                var queryable = (from container in _sharpContext.ContainersModel
                                 join page in _sharpContext.PageModel on container.PageId equals page.PageId
                                 orderby container.ContainersId descending
                                 select new ContainersGrid()
                                 {
                                     Status = container.Status == true ? "Active" : "InActive",
                                     ContainerName = container.ContainerName,
                                     PageName = page.PageName,
                                     ContainersId = container.ContainersId
                                 }
                    );

                if (!(string.IsNullOrEmpty(sortColumn) && string.IsNullOrEmpty(sortColumnDir)))
                {
                    queryable = queryable.OrderBy(sortColumn + " " + sortColumnDir);
                }
                else
                {
                    queryable = queryable.OrderByDescending(x => x.ContainersId);
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

        public List<DisplayAttachmentsViewModel> GetListofAttachmentsbyPageId(int pageId)
        {
            try
            {
                var queryable = (from attachments in _sharpContext.AttachmentsModel.AsNoTracking()
                                 where attachments.PageId == pageId
                                 select new DisplayAttachmentsViewModel()
                                 {
                                     VirtualPath = attachments.VirtualPath,
                                     DirectoryName = attachments.DirectoryName,
                                     AttachmentId = attachments.AttachmentId,
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

        public AttachmentsModel GetAttachmentsByAttachmentId(long pageId, long attachmentId)
        {
            try
            {
                var attachmentsinfo = (from attachments in _sharpContext.AttachmentsModel.AsNoTracking()
                    where attachments.PageId == pageId && attachments.AttachmentId == attachmentId
                    select attachments).FirstOrDefault();
                return attachmentsinfo;
            }
            catch (Exception)
            {

                throw;
            }
        }


        public ContainersModel GetCoontainerDetailsbyId(int containersId)
        {
            try
            {
                var queryable = (from page in _sharpContext.ContainersModel.AsNoTracking()
                                 where page.ContainersId == containersId
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