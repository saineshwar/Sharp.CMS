using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sharp.CMS.Common;
using Sharp.CMS.Data.NewPage.Command;
using Sharp.CMS.Data.NewPage.Queries;
using Sharp.CMS.Models.Page;
using Sharp.CMS.ViewModels.Page;
using Sharp.CMS.Web.Filters;
using Sharp.CMS.Web.Notification;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;
using Sharp.CMS.ViewModels.Attachments;


namespace Sharp.CMS.Web.Areas.Administration.Controllers
{
    [Area("Administration")]
    [SessionTimeOut]
    public class ContainerController : Controller
    {

        private readonly INewContainerCommand _iNewContainerCommand;
        private readonly INewContainerQueries _iNewContainerQueries;
        private readonly INotificationService _notificationService;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public ContainerController(INewPageQueries newPageQueries,
            INewContainerCommand iNewContainerCommand,
            INewContainerQueries iNewContainerQueries,
            INotificationService notificationService,

            IMapper mapper, IWebHostEnvironment webHostEnvironment)
        {
            _iNewContainerCommand = iNewContainerCommand;
            _iNewContainerQueries = iNewContainerQueries;
            _notificationService = notificationService;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<IActionResult> DownloadAttachment(long? pageId, long? attachmentId)
        {
            try
            {

                if (attachmentId == null || pageId == null)
                {
                    return RedirectToAction("Index", "NewPage");
                }

                var document = _iNewContainerQueries.GetAttachmentsByAttachmentId(pageId.Value, attachmentId.Value);
                if (document != null)
                {
                    string path = $"wwwroot{document.VirtualPath}";
                    byte[] data = await System.IO.File.ReadAllBytesAsync(path);

                    return File(data, System.Net.Mime.MediaTypeNames.Application.Octet, document.GenerateAttachmentName);
                }

                return RedirectToAction("Index", "NewPage");


            }
            catch (Exception)
            {

                throw;
            }
        }


        public IActionResult DeleteAttachment(RequestAttachments requestAttachments)
        {
            try
            {
                if (requestAttachments.AttachmentsId == null || requestAttachments.PageId == null)
                {
                    return RedirectToAction("Index", "NewPage");
                }

                var document = _iNewContainerQueries.GetAttachmentsByAttachmentId(requestAttachments.PageId.Value, requestAttachments.AttachmentsId.Value);
                if (document == null)
                {
                    return Json(new { Status = false });
                }

                var result = _iNewContainerCommand.DeleteAttachmentByAttachmentId(document);
                if (result)
                {
                    return Json(new { Status = true });
                }
                else
                {
                    return Json(new { Status = false });
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
