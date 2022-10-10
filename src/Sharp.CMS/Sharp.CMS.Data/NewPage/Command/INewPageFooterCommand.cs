using Sharp.CMS.Models.Page;

namespace Sharp.CMS.Data.NewPage.Command
{
    public interface INewPageFooterCommand
    {
        int Add(PageFooterModel pageFooterModel);
        int Update(PageFooterModel pageFooterModel);
        bool Deactivate(PageFooterModel pageFooterModel);
        bool SetDefaultFooter(int? pageFooterId);
    }
}