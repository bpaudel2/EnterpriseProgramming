using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularApplication.Models
{
    public class DbInitializer
    {
        public static void Initialize(TodoDBContext context)
        {
            context.Database.EnsureCreated();
            //Look for students.
            if (context.Todo.Any())
            {
                return; //DB has been seeded
            }
            var todos = new Todo[]
            {
                new Todo{title="TEST ACTIVE TODO",description="Test description for active todo",date="2018-04-24T11:59", tags="More,than,one,tags,can,be,entered,separated,with,comma", state="active" },
                new Todo{title="TEST COMPLETED TODO",description="Test description for completed todo",date="2018-04-29T11:59", tags="tags,can,be,anything,apple,ball,cat,dog,elephant", state="completed" },

            };
            foreach(Todo todo in todos)
            {
                context.Todo.Add(todo);
            }
            context.SaveChanges();
            var warningtimes = new Warningtime[]
            {
                new Warningtime{ dayhour="2days 0hours"}
            };
            foreach(Warningtime warningtime in warningtimes)
            {
                context.Warningtime.Add(warningtime);
            }
            context.SaveChanges();
        }

    }
}
