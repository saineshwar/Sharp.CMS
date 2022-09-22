using Sharp.CMS.Data.Data;
using Sharp.CMS.Models.Page;
using Sharp.CMS.ViewModels.Page;

namespace Sharp.CMS.Data.NewPage.Command
{
    public class NewContainerCommand : INewContainerCommand
    {
        private readonly SharpContext _sharpContext;
        public NewContainerCommand(SharpContext sharpContext)
        {
            _sharpContext = sharpContext;
        }
        public int Add(ContainersModel containersModel)
        {
            _sharpContext.ContainersModel.Add(containersModel);

            foreach (var VARIABLE in COLLECTION)
            {
                
            }
            return _sharpContext.SaveChanges();
        }
    }
}