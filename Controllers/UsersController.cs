using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BettingProject.Data;
using BettingProject.Model;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;
using Newtonsoft.Json;

namespace BettingProject.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("GetDbTokenByKey/{Key}")]
        public object GetDbTokenByKey(string key)
        {
            return _context.ConfigKeys.Where(w => w.Key == key).ToArray()[0];
        }

        [HttpPost("NewUser")]
        public ActionResult<User> NewUser([FromBody] RegisterUser userdata)
        {
            User user = new User()
            {
                Username = userdata.Username,
                PasswordHash = userdata.PasswordHash,
                Email = userdata.Email,
                Permissions = "000000",
                Wallet = 0.0,
                DateCreated = DateTime.Now,
                DateUpdate = DateTime.Now
            };

            if (_context.Users == null)
                return Problem("Entity set 'DataContext.User'  is null.");
            else if (UserExists(user.Username))
                return Conflict();

            _context.Users.Add(user);
            _context.SaveChanges();

            return CreatedAtAction("The new user has been created successfully! ", new { id = user.Username }, user);
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(string id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(string id, User user)
        {
            if (id != user.Username)
            {
                return BadRequest();
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }



        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(string id)
        {
            return (_context.Users?.Any(e => e.Username == id)).GetValueOrDefault();
        }
    }
}
