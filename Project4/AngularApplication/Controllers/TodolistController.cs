using System;
using System.Linq;
using System.Threading.Tasks;
using AngularApplication.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AngularApplication.Controllers
{
    [Route("api/[controller]")]
    public class TodolistController : Controller
    {
        private TodoDBContext dbContext;

        public TodolistController(TodoDBContext todolistDBContext)
        {
            this.dbContext = todolistDBContext;
        }
        // GET: api/<controller>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var todo = await this.dbContext.Todo.ToListAsync();
            return new ObjectResult(todo);
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var todo = this.dbContext.Todo.FirstOrDefault(p => p.ID == id);
                if (todo == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }
                return new ObjectResult(todo);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        // POST api/<controller>
        [HttpPost]
        public IActionResult Post([FromBody]Todo value)
        {
            //This line added from tutorial
            if (value == null)
            {
                return BadRequest();
            }
            this.dbContext.Add(value);
            this.dbContext.SaveChanges();
            return StatusCode(201);
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Todo value)
        {
            try
            {
                var todo = this.dbContext.Todo.FirstOrDefault(p => p.ID == id);
                if (todo == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }
                todo.title = value.title;
                todo.description = value.description;
                todo.date = value.date;
                todo.tags = value.tags;
                todo.state = value.state;
                this.dbContext.Todo.Update(todo);
                this.dbContext.SaveChanges();
                return StatusCode(StatusCodes.Status202Accepted);
            }
            catch(Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);

            }

        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var todo = this.dbContext.Todo.FirstOrDefault(p => p.ID == id);
                if(todo == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }
                this.dbContext.Todo.Remove(todo);
                this.dbContext.SaveChanges();
                return StatusCode(StatusCodes.Status200OK);

            }
            catch(Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
