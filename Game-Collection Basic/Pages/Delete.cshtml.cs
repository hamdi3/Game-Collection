using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using TestProjekt.Models;

namespace TestProjekt.Pages
{
    public class DeleteModel : PageModel
    {
        private readonly TestProjekt.Models.TestProjektContext _context;

        public DeleteModel(TestProjekt.Models.TestProjektContext context)
        {
            _context = context;
        }

        [BindProperty]
        public GameList GameList { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            GameList = await _context.GameList.SingleOrDefaultAsync(m => m.GL_ID == id);

            if (GameList == null)
            {
                return NotFound();
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            GameList = await _context.GameList.FindAsync(id);

            if (GameList != null)
            {

                using (SqlConnection connection = new SqlConnection("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=TestProjektContext-f3ae0332-5488-4642-b8f5-6c0d0567d1c2;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"))
                {
                    connection.Open();
                    string sql = "DELETE from UserGame WHERE USR_ID = @UserID and GL_ID = @GameID";
                    using (SqlCommand cmd = new SqlCommand(sql, connection))
                    {
                        //cmd.Parameters.AddWithValue("@UserID", TestProjekt.Pages.Signin.user_id);
                        cmd.Parameters.AddWithValue("@UserID", User_id.user_id);
                        cmd.Parameters.AddWithValue("@GameID", id);
                        cmd.ExecuteNonQuery();
                        connection.Close();
                    }

                }
            }

            return RedirectToPage("./Index");
        }
    }
}
