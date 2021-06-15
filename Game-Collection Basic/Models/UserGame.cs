using System;
using System.ComponentModel.DataAnnotations;

namespace TestProjekt.Models
{
    public class UserGame
    {
        [Key]
        public int UG_ID { get; set; }
        public int USR_ID { get; set; }
        public int GL_ID { get; set; }

    }
}
