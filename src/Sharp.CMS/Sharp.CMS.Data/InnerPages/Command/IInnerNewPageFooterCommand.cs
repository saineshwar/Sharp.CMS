﻿using Sharp.CMS.Models.InnerPage;

namespace Sharp.CMS.Data.InnerPages.Command
{
    public interface IInnerNewPageFooterCommand
    {
        int Add(InnerPageFooterModel pageFooterModel);
        int Update(InnerPageFooterModel pageFooterModel);
        int Deactivate(InnerPageFooterModel pageFooterModel);
        bool SetDefaultFooter(int? pageFooterId);
    }
}