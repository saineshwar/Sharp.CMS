using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Sharp.CMS.ViewModels.LayoutConfiguration
{
    public class LayoutConfigurationViewModel
    {
        public string Header1 { get; set; }
        public string Header2 { get; set; }
        public string Header3 { get; set; }
        public string Header4 { get; set; }
        public string Header5 { get; set; }
        public List<SelectListItem> ListofHeaders { get; set; }


        public string Container1 { get; set; }
        public string Container2 { get; set; }
        public string Container3 { get; set; }
        public string Container4 { get; set; }
        public string Container5 { get; set; }
        public List<SelectListItem> ListofContainers { get; set; }

        public string Footer1 { get; set; }
        public string Footer2 { get; set; }
        public string Footer3 { get; set; }
        public string Footer4 { get; set; }
        public string Footer5 { get; set; }
        public List<SelectListItem> ListofFooters { get; set; }


        public string Widget1 { get; set; }
        public string Widget2 { get; set; }
        public List<SelectListItem> ListofWidgets { get; set; }
    }
}