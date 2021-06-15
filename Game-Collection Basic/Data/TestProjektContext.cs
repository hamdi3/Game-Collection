using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TestProjekt.Models
{
    public class TestProjektContext : DbContext
    {
        public TestProjektContext (DbContextOptions<TestProjektContext> options)
            : base(options)
        {
        }
        public DbSet<TestProjekt.Models.GameList> GameList { get; set; }
        public DbSet<TestProjekt.Models.Users> Users { get; set; }
        public DbSet<TestProjekt.Models.UserGame> UserGame { get; set; }
    }
}
