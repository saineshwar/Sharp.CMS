using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Sharp.CMS.ViewModels.MediaAssets
{
    public class UploadMediaViewModel
    {
        [Display(Name = "Album")]
        public string AlbumId { get; set; }
        public List<SelectListItem> ListofAlbum { get; set; }
        public string HiddenAlbumId { get; set; }
        public IFormFile Thumbnailfile { get; set; }
    }

 
}