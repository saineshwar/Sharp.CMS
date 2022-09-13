using Sharp.CMS.Data.Data;

namespace Sharp.CMS.Data.NewPage.Queries
{
    public class NewPageHeaderQueries : INewPageHeaderQueries
    {
        private readonly SharpContext _sharpContext;
        public NewPageHeaderQueries(SharpContext sharpContext)
        {
            _sharpContext = sharpContext;
        }



    }
}