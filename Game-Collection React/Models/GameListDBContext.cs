using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestProjekt.Models;

namespace React_Project_1.Models
{
    public class GameListDBContext: DbContext
    {
        public GameListDBContext(DbContextOptions<GameListDBContext> options):base(options)
        {

        }
        public DbSet<Game> Games { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserGame> UserGame { get; set; }
    }
}
