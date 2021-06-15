using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using TestProjekt.Models;
using System.Data.SqlClient;
using System.IO;
using System.Security.Cryptography;
using Microsoft.SqlServer.Server;
using System.Text;

namespace TestProjekt.Pages
{
    public class Register : PageModel
    {
        private readonly TestProjekt.Models.TestProjektContext _context;

        public Register(TestProjekt.Models.TestProjektContext context)
        {
            _context = context;
        }
        public static string HashString(string inputString)
        {
            using (HashAlgorithm algorithm = SHA256.Create())
                return Convert.ToBase64String( algorithm.ComputeHash(Encoding.UTF8.GetBytes(inputString)));
        }
        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public Users Users { get; set; }


        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            Users usr = new Users();
            usr = Users;
            usr.USR_Password = HashString (Users.USR_Password);


            _context.Users.Add(usr);
            await _context.SaveChangesAsync();
            return RedirectToPage("./Index");
        }
    }

}