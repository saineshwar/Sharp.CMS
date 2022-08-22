﻿using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Sharp.CMS.ViewModels.MenuCategory
{
    public class CreateMenuCategoryViewModel
    {
        [Display(Name = "MenuCategory")]
        [Required(ErrorMessage = "Enter CategoryName")]
        public string MenuCategoryName { get; set; }

        [Display(Name = "Role")]
        [Required(ErrorMessage = "Select Role")]
        public int RoleId { get; set; }

        [Display(Name = "IsActive")]
        [Required(ErrorMessage = "Required IsActive")]
        public bool Status { get; set; }

        public List<SelectListItem> ListofRoles { get; set; }
    }
}