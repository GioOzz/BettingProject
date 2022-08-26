using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BettingProject.Model
{
    public class User
    {
        [Key]
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string Email { get; set; }
        public string PermissionPages { get; set; }
        public double Wallet { get; set; }
    }
}
