using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestProjekt.Models
{
    public class GameList
    {
        [Key]
        public int GL_ID { get; set; }
        [Display(Name = "Title")]
        public String GL_Title { get; set; }
        [Display(Name = "Genre")]
        public String GL_Genre { get; set; }
        [Display(Name = "Plattform")]
        public String GL_Plattform { get; set; }
        [DataType(DataType.Date)]
        [Display(Name = "Release Date")]
        public DateTime GL_ReleaseDate { get; set; }
        [Display(Name = "Price")]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal GL_Price { get; set; }


    }
}
