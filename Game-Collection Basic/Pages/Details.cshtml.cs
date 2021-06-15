using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using TestProjekt.Models;

namespace TestProjekt.Pages
{
    public class DetailsModel : PageModel
    {
        private readonly TestProjekt.Models.TestProjektContext _context;

        public DetailsModel(TestProjekt.Models.TestProjektContext context)
        {
            _context = context;
        }

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
    }
}
