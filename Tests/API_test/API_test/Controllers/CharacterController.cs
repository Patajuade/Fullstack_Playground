using API_test.Models;
using API_test.Persistence;
using Microsoft.AspNetCore.Mvc;

namespace API_test.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CharacterController : ControllerBase
    {
        private readonly ILogger<CharacterController> _logger;
        private readonly DataContext _context;

        public CharacterController(ILogger<CharacterController> logger, DataContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet(Name = "GetCharacter")]
        public IActionResult Get() //IActionResult permet de renvoyer des réponses HTTP
        {
            var characters = _context.Character.ToList();
            return Ok(characters);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCharacter([FromBody] Character character)
        {
            _context.Character.Add(character);
            await _context.SaveChangesAsync();

            return Ok(character);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCharacter(Guid id, [FromBody] Character updatedCharacter)
        {
            var character = await _context.Character.FindAsync(id);
            if (character == null)
            {
                return NotFound();
            }

            character.Name = updatedCharacter.Name;
            character.Class = updatedCharacter.Class;
            character.DateOfCreation = updatedCharacter.DateOfCreation;
            character.Role = updatedCharacter.Role;

            await _context.SaveChangesAsync();
            return Ok(character);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCharacter(Guid id)
        {
            var character = await _context.Character.FindAsync(id);
            if (character == null)
            {
                return NotFound();
            }

            _context.Character.Remove(character);
            await _context.SaveChangesAsync();
            return Ok(character);
        }


    }
}

