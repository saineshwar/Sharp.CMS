
using Sharp.CMS.Models.Notices;

namespace Sharp.CMS.Data.Notices.Command
{
    public interface INoticeDetailsCommand
    {
        void AddNoticeDetails(NoticeDetails noticeDetails);
        void UpdateNoticeDetails(NoticeDetails noticeDetails);
        void DeleteNoticeDetails(NoticeDetails noticeDetails);
    }
}