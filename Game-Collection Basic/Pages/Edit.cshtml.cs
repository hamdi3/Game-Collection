using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using TestProjekt.Models;

namespace TestProjekt.Pages
{
    public class EditModel : PageModel
    {
        private readonly TestProjekt.Models.TestProjektContext _context;

        public EditModel(TestProjekt.Models.TestProjektContext context)
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

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Attach(GameList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GamesExists(GameList.GL_ID))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return RedirectToPage("./Index");
        }

        private bool GamesExists(int id)
        {
            return _context.GameList.Any(e => e.GL_ID == id);
        }
    }
}
