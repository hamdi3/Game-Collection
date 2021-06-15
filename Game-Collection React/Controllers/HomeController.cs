using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using React_Project_1.Models;
using static React_Project_1.Controllers.UsersController;

namespace React_Project_1.Controllers
{
    public static class User_id
    {
        public static int user_id;
        public static String userName;
        public static String userPassword;
    }
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }

/*-------------------------------------------------------------------------------------------------------------------------------------------*/

    [Produces("application/json")]
    [Route("api/Games")]
    public class GamesController : Controller
    {
        private readonly GameListDBContext _context;

        public GamesController(GameListDBContext context)
        {
            _context = context;
        }

        //[Route("SearchGame")]
        //[HttpGet]
        //public IEnumerable<Game> SearchGames([FromRoute] string SearchString)
        //{
        //    var game = from m in _context.Games join n in _context.UserGame on m.G_Id equals n.GL_ID where n.USR_ID == User_id.user_id select m;
        //    game = game.Where(s => s.G_Title.Contains(SearchString));
        //    return from m in game select m;
        //}

        // GET: api/Games
        [HttpGet("[action]")]
        public IEnumerable<Game> GetGames()
        {

          
                return from m in _context.Games join n in _context.UserGame on m.G_Id equals n.GL_ID where n.USR_ID == User_id.user_id select m;
            
            //return from m in _context.Games join n in _context.UserGame on m.G_Id equals n.GL_ID where n.USR_ID == User_id.user_id & m.G_Title.Contains(SearchString) select m;
            //to get the games that share the same user id

        }
        [HttpPost("{Select}")]
        [Route("GetGamesPerSelect")]
        public IEnumerable<Game> GetGamesPerSelect(string Select)
        {
            if (Select == null)
            {
                return from m in _context.Games join n in _context.UserGame on m.G_Id equals n.GL_ID where n.USR_ID == User_id.user_id select m;
            }
            return from m in _context.Games join n in _context.UserGame on m.G_Id equals n.GL_ID where n.USR_ID == User_id.user_id & m.G_Genre == (Select) select m;
        }

        [HttpPost("{SearchString}")]
        [Route("GetGamesPerString")]
        public IEnumerable<Game> GetGamesPerString(string SearchString)
        {

            if (SearchString == null)
            {
                return from m in _context.Games join n in _context.UserGame on m.G_Id equals n.GL_ID where n.USR_ID == User_id.user_id select m;
            }
            return from m in _context.Games join n in _context.UserGame on m.G_Id equals n.GL_ID where n.USR_ID == User_id.user_id & m.G_Title.Contains(SearchString) select m;
            //to get the games that share the same user id

        }


        // GET: api/Games/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGame([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var game = await _context.Games.SingleOrDefaultAsync(m => m.G_Id == id);

            if (game == null)
            {
                return NotFound();
            }

            return Ok(game);
        }

        // PUT: api/Games/5
        [HttpPut("{id}")]
        [Route("EditGame")]
        public async Task<IActionResult> PutGame([FromRoute] int id, [FromBody] Game game)
        {
            id = game.G_Id ;
            //game.G_Id = id;

            _context.Entry(game).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GameExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Games
        [Produces("application/json")]
        [Route("CreateGame")]
        [HttpPost]
        public async Task<IActionResult> PostGame([FromBody] Game game)
        {
            _context.Games.Add(game);
            await _context.SaveChangesAsync();
            using (SqlConnection connection = new SqlConnection("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=GameListDBContext;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"))
            {
                connection.Open();
                string sql = "INSERT INTO UserGame VALUES(@UserID , @GameID)";
                using (SqlCommand cmd = new SqlCommand(sql, connection))
                {
                    //cmd.Parameters.AddWithValue("@UserID", TestProjekt.Pages.Signin.user_id);
                    cmd.Parameters.AddWithValue("@UserID", User_id.user_id);
                    cmd.Parameters.AddWithValue("@GameID", game.G_Id);
                    cmd.ExecuteNonQuery();
                    connection.Close();
                }
            }
            return CreatedAtAction("GetGame", new { id = game.G_Id }, game);
        }

        // DELETE: api/Games/5
        [Route("DeleteGame")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGame([FromRoute] int id , [FromBody] Game games)
        {
            id = games.G_Id;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            using (SqlConnection connection = new SqlConnection("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=GameListDBContext;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"))
            {
                connection.Open();
                string sql = "DELETE from UserGame WHERE USR_ID = @UserID and GL_ID = @GameID";
                using (SqlCommand cmd = new SqlCommand(sql, connection))
                {
                    //cmd.Parameters.AddWithValue("@UserID", TestProjekt.Pages.Signin.user_id);
                    cmd.Parameters.AddWithValue("@UserID", User_id.user_id);
                    cmd.Parameters.AddWithValue("@GameID", games.G_Id);
                    cmd.ExecuteNonQuery();
                    connection.Close();
                }

            }
            //_context.Games.Remove(game);
            await _context.SaveChangesAsync();

            return Ok(games);
        }




        private bool GameExists(int id)
        {
            return _context.Games.Any(e => e.G_Id == id);
        }
    }
    /*-------------------------------------------------------------------------------------------------------------------------------------------*/
    [Produces("application/json")]
    [Route("api/Users")]
    public class UsersController : Controller
    {
        private readonly GameListDBContext _context;

        public UsersController(GameListDBContext context)
        {
            _context = context;
        }

        // GET: api/Games
        public static string HashString(string inputString)
        {
            using (HashAlgorithm algorithm = SHA256.Create())
                return Convert.ToBase64String(algorithm.ComputeHash(Encoding.UTF8.GetBytes(inputString)));
        }

        [BindProperty]
        public User Users { get; set; }


        [HttpPost ]

        public async Task<IActionResult> Register([FromBody] User user)
        {
            user.USR_Password = HashString(user.USR_Password);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return CreatedAtAction("Register", new { id = Users.USR_Id }, user);
        }

        [HttpPost]
        [Route("Signin")]
        public async Task<IActionResult> Signin([FromBody] User user)
        {
            using (SqlConnection connection = new SqlConnection("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=GameListDBContext;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"))
            {
                user.USR_Password = HashString(user.USR_Password);
                connection.Open();
                string sql = "Select * from dbo.Users where USR_UserName=@UserName and USR_Password=@Password";
                using (SqlCommand cmd = new SqlCommand(sql, connection))
                {
                    cmd.Parameters.AddWithValue("@UserName", user.USR_UserName);
                    cmd.Parameters.AddWithValue("@Password", user.USR_Password);
                    SqlDataReader sdr = cmd.ExecuteReader();

                    DataTable dt = new DataTable();
                    dt.Load(sdr);

                    if (dt.Rows.Count != 1)
                    {
                        connection.Close();
                        return NotFound();
                    }
                    
                    User_id.user_id = (int)dt.Rows[0]["USR_Id"];
                    User_id.userName = (String)dt.Rows[0]["USR_UserName"];
                    User_id.userPassword = (String)dt.Rows[0]["USR_Password"];
                }
                var users = await _context.Users.SingleOrDefaultAsync(m => m.USR_Id == User_id.user_id);
                connection.Close();
                return Ok(users);
            }
        }
        [HttpPost]
        [Route("LogOut")]
        public IActionResult OnPost()
        {
            User_id.user_id = 0;
            return Ok();
        }
    }
}

