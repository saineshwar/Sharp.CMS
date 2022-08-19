
using Microsoft.EntityFrameworkCore;
using Sharp.CMS.Data.Data;
using Sharp.CMS.Data.Notices.Command;
using Sharp.CMS.Models.Notices;

namespace Sharp.CMS.Data.Notices.Command
{
    public class NoticeDetailsCommand : INoticeDetailsCommand
    {
        private readonly SharpContext _sharpContext;
        public NoticeDetailsCommand(SharpContext SharpContext)
        {
            _sharpContext = SharpContext;
        }
        public void AddNoticeDetails(NoticeDetails noticeDetails)
        {
            _sharpContext.NoticeDetails.Add(noticeDetails);
        }

        public void UpdateNoticeDetails(NoticeDetails noticeDetails)
        {
            _sharpContext.Entry(noticeDetails).State = EntityState.Modified;
        }

        public void DeleteNoticeDetails(NoticeDetails noticeDetails)
        {
            _sharpContext.Entry(noticeDetails).State = EntityState.Deleted;
        }
    }
}