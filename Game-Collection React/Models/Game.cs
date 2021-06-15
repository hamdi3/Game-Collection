using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace React_Project_1.Models
{
    public class Game
    {
        [Key]
        public int G_Id { get; set; }

        [Display(Name = "Title")]
        [Column(TypeName = "nvarchar(100)")]
        public string G_Title { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        [Display(Name = "Genre")]
        public string G_Genre { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        [Display(Name = "Plattform")]
        public string G_Plattform { get; set; }

        [Column(TypeName = "DATETIME2 (7)")]
        [Display(Name = "Release Date")]
        public DateTime G_ReleaseDate { get; set; }

        [Display(Name = "Price")]
        [Column(TypeName = "DECIMAL (18, 2)")]
        public decimal G_Price { get; set; }
    }
}
