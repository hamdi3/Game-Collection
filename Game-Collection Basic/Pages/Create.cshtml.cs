using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using TestProjekt.Models;

namespace TestProjekt.Pages
{
    public class CreateModel : PageModel
    {
        private readonly TestProjekt.Models.TestProjektContext _context;

        public CreateModel(TestProjekt.Models.TestProjektContext context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public GameList GameList { get; set; }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }
            _context.GameList.Add(GameList);

            await _context.SaveChangesAsync();
            using (SqlConnection connection = new SqlConnection("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=TestProjektContext-f3ae0332-5488-4642-b8f5-6c0d0567d1c2;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"))
            {
                connection.Open();
                string sql = "INSERT INTO UserGame VALUES(@UserID , @GameID)";
                using (SqlCommand cmd = new SqlCommand(sql, connection))
                {
                    //cmd.Parameters.AddWithValue("@UserID", TestProjekt.Pages.Signin.user_id);
                    cmd.Parameters.AddWithValue("@UserID", User_id.user_id);
                    cmd.Parameters.AddWithValue("@GameID", GameList.GL_ID);
                    cmd.ExecuteNonQuery();
                    connection.Close();
                }

            }
            return RedirectToPage("./Index");
        }
    }
}