﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Sharp.CMS.ViewModels.UserMaster
{
    public class CreateUserViewModel
    {
        [StringLength(30, MinimumLength = 6, ErrorMessage = "Maximum 30 characters and Minimum 6")]
        [Required(ErrorMessage = "Username Required")]
        [Display(Name = "UserName")]
        public string UserName { get; set; }

        [StringLength(50, MinimumLength = 2, ErrorMessage = "Maximum 50 characters and Minimum 2")]
        [Required(ErrorMessage = "Enter FirstName")]
        [Display(Name = "FirstName")]
        public string FirstName { get; set; }

        [StringLength(50, MinimumLength = 2, ErrorMessage = "Maximum 50 characters and Minimum 2")]
        [Required(ErrorMessage = "Enter LastName")]
        [Display(Name = "LastName")]
        public string LastName { get; set; }

        [Display(Name = "EmailId")]
        [Required(ErrorMessage = "EmailID Required")]
        [RegularExpression(@"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$", ErrorMessage = "Please enter a valid e-mail address")]
        public string EmailId { get; set; }

        [Display(Name = "MobileNo")]
        [Required(ErrorMessage = "Mobile-no Required")]
        [RegularExpression(@"^(\d{10})$", ErrorMessage = "Wrong Mobile-no")]
        public string MobileNo { get; set; }

        [Display(Name = "Gender")]
        [Required(ErrorMessage = "Gender Required")]
        public string Gender { get; set; }

        [Display(Name = "Status")]
        public bool? Status { get; set; }

        [Display(Name = "Password")]
        [MinLength(7, ErrorMessage = "Minimum Password must be 7 in characters")]
        [Required(ErrorMessage = "Password Required")]
        public string Password { get; set; }

        [Display(Name = "ConfirmPassword")]
        [Required(ErrorMessage = "Confirm Password Required")]
        [System.ComponentModel.DataAnnotations.Compare("Password", ErrorMessage = "Enter Valid Password")]
        public string ConfirmPassword { get; set; }

        [Display(Name = "Role")]
        [Required(ErrorMessage = "Choose Role")]
        public short RoleId { get; set; }
        public List<SelectListItem> ListofRoles { get; set; }

        [Display(Name = "Designation")]
        [Required(ErrorMessage = "Choose Designation")]
        public short DesignationId { get; set; }
        public List<SelectListItem> ListofDesignation { get; set; }
    }
}