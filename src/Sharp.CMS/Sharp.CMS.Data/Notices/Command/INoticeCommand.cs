using Sharp.CMS.Models.Notices;

namespace Sharp.CMS.Data.Notices.Command
{
    public interface INoticeCommand
    {
        int AddNotice(Notice notice, NoticeDetails noticeDetails);
        int UpdateNotice(Notice notice, NoticeDetails noticeDetails);
        int DeleteNotice(Notice notice, NoticeDetails noticeDetails);
    }
}