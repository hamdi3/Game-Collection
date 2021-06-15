using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace React_Project_1.Models
{
    public class User
    {
        [Key]
        public int USR_Id { get; set; }

        [Display(Name = "UserName")]
        [Column(TypeName = "nvarchar(100)")]
        public string USR_UserName { get; set; }
        [Display(Name = "Password")]
        [Column(TypeName = "nvarchar(MAX)")]
        public string USR_Password { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        [Display(Name = "First Name")]
        public string USR_FirstName { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        [Display(Name = "LastName")]
        public string USR_LastName { get; set; }

    }
}
