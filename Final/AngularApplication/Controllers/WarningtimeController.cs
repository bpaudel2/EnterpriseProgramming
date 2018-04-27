using AngularApplication.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AngularApplication.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class WarningtimeController : Controller
    {
        private TodoDBContext dbContext;

        public WarningtimeController(TodoDBContext warningtimeDBContext)
        {
            this.dbContext = warningtimeDBContext;
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var owner = User.Identity.Name;
            if (owner == null)
            {
                return StatusCode(StatusCodes.Status401Unauthorized);
            }
            var warningtime = await this.dbContext.Warningtime.Where(w=> w.Owner == owner).ToListAsync();
            if (warningtime.Count == 0)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }
            return new ObjectResult(warningtime);
        }



        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var owner = User.Identity.Name;
                if (owner == null)
                {
                    return StatusCode(StatusCodes.Status401Unauthorized);
                }
                var warningtime = this.dbContext.Warningtime.FirstOrDefault(p => p.ID == id && p.Owner==owner);
                if (warningtime == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }
                return new ObjectResult(warningtime);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]Warningtime value)
        {
            //This line added from tutorial
            if (value == null)
            {
                return BadRequest();
            }
            var owner = User.Identity.Name;
            if (owner == null)
            {
                return StatusCode(StatusCodes.Status401Unauthorized);
            }

            value.Owner = owner;
            this.dbContext.Add(value);
            this.dbContext.SaveChanges();
            return StatusCode(201);
        }

        // PUT api/<controller>/5
        //Since we will only be updating seeded warning time.
        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Warningtime value)
        {
            try
            {
                var owner = User.Identity.Name;
                if (owner == null)
                {
                    return StatusCode(StatusCodes.Status401Unauthorized);
                }
                var warningtime = this.dbContext.Warningtime.FirstOrDefault(p => p.ID == id && p.Owner==owner);
                if (warningtime == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }
                

                warningtime.dayhour = value.dayhour;
                
                this.dbContext.Warningtime.Update(warningtime);
                this.dbContext.SaveChanges();
                return StatusCode(StatusCodes.Status202Accepted);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);

            }

        }
    }

    
}


