using System.Linq;
using Sharp.CMS.Models.Notices;
using Sharp.CMS.ViewModels.Notices;

namespace Sharp.CMS.Data.Notices.Queries
{
    public interface INoticeQueries
    {
        NoticeDisplayViewModel ShowNotice();
        bool ShowNotice(string fromdatetime, string todatetime);
        IQueryable<NoticeGrid> ShowAllNotice(string sortColumn, string sortColumnDir, string search);
        EditNoticeViewModel GetNoticeDetailsForEdit(int? noticeId);
        Notice GetNoticeByNoticeId(int? noticeId);
        NoticeDetails GetNoticeDetailsByNoticeId(int? noticeId);
    }
}