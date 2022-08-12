using Microsoft.EntityFrameworkCore;

namespace Sharp.CMS.Data.Data
{
    public class SharpContext : DbContext
    {
        public SharpContext(DbContextOptions<SharpContext> options) : base(options)
        {

        }


    }
}