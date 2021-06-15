using System;
using System.Data.SqlClient;
using System.Data;
using TestProjekt.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc;

namespace TestProjekt.Pages
{
    public static class User_id
    {
        public static int user_id;
        public static String userName;
        public static String userPassword;
    }
    public partial class Signin : PageModel
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [BindProperty]
        public Users Users { get; set; }

        public IActionResult OnPost()
        {
            using (SqlConnection connection = new SqlConnection("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=TestProjektContext-f3ae0332-5488-4642-b8f5-6c0d0567d1c2;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"))
            {
                connection.Open();
                String Password = Register.HashString(Users.USR_Password);
                string sql = "Select * from dbo.Users where USR_UserName=@UserName and USR_Password=@Password";
                using (SqlCommand cmd = new SqlCommand(sql, connection))
                {
                    cmd.Parameters.AddWithValue("@UserName", Users.USR_UserName);
                    cmd.Parameters.AddWithValue("@Password", Password);
                    SqlDataReader sdr = cmd.ExecuteReader();

                    DataTable dt = new DataTable();
                    dt.Load(sdr);

                    if (dt.Rows.Count != 1)
                    {
                        connection.Close();
                        return RedirectToPage("./Register");
                    }

                    User_id.user_id = (int)dt.Rows[0]["USR_ID"];

                    User_id.userName = (String)dt.Rows[0]["USR_UserName"];
                    User_id.userPassword = (String)dt.Rows[0]["USR_Password"];
                }

                connection.Close();
                return RedirectToPage("./Index");
            }
        }
    }
}
