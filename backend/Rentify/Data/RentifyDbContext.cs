using Microsoft.EntityFrameworkCore;
using Rentify.Models;

namespace Rentify.Data
{
    public class RentifyDbContext:DbContext
    {
        public RentifyDbContext(DbContextOptions<RentifyDbContext> dbContextOptions):base(dbContextOptions)
        {

        }

        public DbSet<User> users { get; set; }

        public DbSet<Property> properties { get; set; }
    }
}
