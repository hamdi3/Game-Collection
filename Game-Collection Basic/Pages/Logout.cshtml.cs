using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace TestProjekt.Pages
{
    public class LogoutModel : PageModel
    {
        public IActionResult OnPost()
        {
            User_id.user_id = 0;
            return RedirectToPage("./Register");
        }
    }
}