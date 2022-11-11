using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Sharp.CMS.ViewModels.MediaAssets
{
    public class AlbumViewModel
    {
        public int? AlbumId { get; set; }
        [Display(Name = "AlbumName")]
        public string AlbumName { get; set; }

        [Display(Name = "AlbumNameLL")]
        public string AlbumNameLL { get; set; }
        public bool IsActive { get; set; }

        [Display(Name = "Album Folder Name")]
        public string Album { get; set; }
        public string MediaTypeId { get; set; }
        public List<SelectListItem> ListofMediaType { get; set; }
    }
}