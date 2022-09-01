using System.ComponentModel.DataAnnotations;

namespace BettingProject.Model
{
    public class User
    {
        [Key]
        public string Username { get; set; }
        public string PasswordHash{ get; set; }
        public string Email { get; set; }
        public string Permissions { get; set; }
        public double Wallet { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdate { get; set; }

    }
}
