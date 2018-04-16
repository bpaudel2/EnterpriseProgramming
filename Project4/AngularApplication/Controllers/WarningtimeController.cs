using AngularApplication.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AngularApplication.Controllers
{
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
            var warningtime = await this.dbContext.Warningtime.ToListAsync();
            return new ObjectResult(warningtime);
        }



        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var warningtime = this.dbContext.Warningtime.FirstOrDefault(p => p.ID == id);
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
        //Since we will only be updating seeded warning time.
        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Warningtime value)
        {
            try
            {
                var warningtime = this.dbContext.Warningtime.FirstOrDefault(p => p.ID == id);
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


