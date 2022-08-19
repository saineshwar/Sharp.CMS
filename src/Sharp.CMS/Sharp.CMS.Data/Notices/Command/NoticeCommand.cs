
using Microsoft.EntityFrameworkCore;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Data.Notices.Command;
using Sharp.CMS.Models.Notices;

namespace Sharp.CMS.Data.Notices.Command
{
    public class NoticeCommand : INoticeCommand
    {
        private readonly SharpContext _sharpContext;
        public NoticeCommand(SharpContext sharpContext)
        {
            _sharpContext = sharpContext;
        }

        public int AddNotice(Notice notice, NoticeDetails noticeDetails)
        {
            _sharpContext.Notice.Add(notice);
            _sharpContext.NoticeDetails.Add(noticeDetails);
            return _sharpContext.SaveChanges();
        }

        public int UpdateNotice(Notice notice, NoticeDetails noticeDetails)
        {
            _sharpContext.Entry(notice).State = EntityState.Modified;
            _sharpContext.Entry(noticeDetails).State = EntityState.Modified;
            return _sharpContext.SaveChanges();
        }

        public int DeleteNotice(Notice notice, NoticeDetails noticeDetails)
        {
            _sharpContext.Entry(notice).State = EntityState.Deleted;
            _sharpContext.Entry(notice).State = EntityState.Deleted;
            return _sharpContext.SaveChanges();
        }
    }
}