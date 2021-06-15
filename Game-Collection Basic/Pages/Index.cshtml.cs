using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TestProjekt.Models;
using System.Data.SqlClient;
using System.Data;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TestProjekt.Pages
{
    public class IndexModel : PageModel
    {
        private readonly TestProjekt.Models.TestProjektContext _context;

        public IndexModel(TestProjekt.Models.TestProjektContext context)
        {
            _context = context;
        }

        public IList<GameList> Game { get; set; }

        [BindProperty(SupportsGet = true)]
        public string SearchString { get; set; }

        public SelectList Genres { get; set; }

        [BindProperty(SupportsGet = true)]
        public string GameGenre { get; set; }


        public async Task  OnGetAsync()
        {
                    IQueryable<string> genreQuery = from m in _context.GameList
                                                    join n in _context.UserGame on m.GL_ID equals n.GL_ID
                                                    where n.USR_ID == User_id.user_id
                                                    orderby m.GL_Genre
                                                    select m.GL_Genre;

                    IQueryable<GameList> games = from m in _context.GameList join n in _context.UserGame on m.GL_ID equals n.GL_ID where n.USR_ID == User_id.user_id   select m ;
                    if (!string.IsNullOrEmpty(SearchString))
                    {
                        games = games.Where(s => s.GL_Title.Contains(SearchString));
                    }

                    if (!string.IsNullOrEmpty(GameGenre))
                    {
                        games = games.Where(x => x.GL_Genre == GameGenre);
                    }
                    Genres = new SelectList(await genreQuery.Distinct().ToListAsync());
                    Game = await games.ToListAsync();
        }
    }
}
