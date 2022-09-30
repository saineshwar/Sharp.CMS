using AutoMapper;
using Sharp.CMS.Models.MenuCategory;
using Sharp.CMS.Models.MenuMaster;
using Sharp.CMS.Models.Notices;
using Sharp.CMS.Models.Page;
using Sharp.CMS.Models.UserMaster;
using Sharp.CMS.ViewModels.MenuCategory;
using Sharp.CMS.ViewModels.MenuMaster;
using Sharp.CMS.ViewModels.Notices;
using Sharp.CMS.ViewModels.Page;
using Sharp.CMS.ViewModels.UserMaster;

namespace Sharp.CMS.Web.AutoMapperMapping
{
    public class SharpAutoMapper : Profile
    {
        public SharpAutoMapper()
        {
            CreateMap<CreateMenuCategoryViewModel, MenuCategoryModel>();
            CreateMap<CreateUserViewModel, UserMasterModel>();
            CreateMap<CreateMenuMasterViewModel, MenuMasterModel>();
            CreateMap<CreateNoticeViewModel, Notice>();
            CreateMap<EditNoticeViewModel, Notice>();
            CreateMap<PageViewModel, PageModel>();
            CreateMap<PageHeaderViewModel, PageHeaderModel>();
            CreateMap<PageFooterViewModel, PageFooterModel>();
            CreateMap<EditPageHeaderViewModel, PageHeaderModel>();
            CreateMap<EditPageFooterViewModel, PageFooterModel>();
            CreateMap<ContainersViewModel, ContainersModel>();
            CreateMap<ContainersModel, EditContainersViewModel>().
                ForMember(x=>x.ContainerDescriptionEn , y=>y.MapFrom(z=>z.ContainerDescription_En))
                .ForMember(x => x.ContainerDescriptionLl, y => y.MapFrom(z => z.ContainerDescription_Ll
                ));
            CreateMap<PageWidgetsViewModel, PageWidgetsModel>();
            CreateMap<EditWidgetsViewModel, PageWidgetsModel>();
        }
    }
}