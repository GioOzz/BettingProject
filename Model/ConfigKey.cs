using System.ComponentModel.DataAnnotations;

namespace BettingProject.Model
{
    public class ConfigKey
    {
        [Key]
        public int IdConfig { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
    }
}
