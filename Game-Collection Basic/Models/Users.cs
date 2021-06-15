using System;
using System.ComponentModel.DataAnnotations;

namespace TestProjekt.Models
{
    public class Users
    {
        [Key]
        public int USR_ID { get; set; }

        [Display(Name = "User Name")]
        [StringLength(60, MinimumLength = 3)]
        [Required]
        public string USR_UserName { get; set; }

        [Display(Name = "Password")]
        [StringLength(60, MinimumLength = 7)]
        [Required]
        public string USR_Password { get; set; }

        [Display(Name = "First Name")]
        [RegularExpression(@"^[A-Z]+[a-zA-Z]*$")]
        [Required]
        public string USR_FirstName { get; set; }

        [Display(Name = "Last Name")]
        [RegularExpression(@"^[A-Z]+[a-zA-Z]*$")]
        [Required]
        public string USR_LastName { get; set; }
    }
}
