using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API_test.Models
{
    public class Character
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public CharacterClass Class { get; set; }
        public DateTime DateOfCreation { get; set; }
        public CharacterRole Role { get; set; }
    }

    public enum CharacterClass
    {
        Warrior,
        Mage,
        Priest,
        Druid,
        Monk,
        Evoker,
        Rogue,
        Shaman,
        Paladin,
        DK,
        DH,
        Hunter
    }

    public enum CharacterRole
    {
        Tank,
        Healer,
        DPS,
        Support
    }

}
