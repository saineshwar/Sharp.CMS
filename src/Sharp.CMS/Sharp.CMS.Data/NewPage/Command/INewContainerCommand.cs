using Sharp.CMS.Models.Page;

namespace Sharp.CMS.Data.NewPage.Command
{
    public interface INewContainerCommand
    {
        int Add(ContainersModel containersModel);
    }
}