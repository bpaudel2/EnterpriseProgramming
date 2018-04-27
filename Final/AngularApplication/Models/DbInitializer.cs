using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularApplication.Models
{
    public class DbInitializer
    {
        public static async Task InitializeAsync(TodoDBContext context, UserManager<ApplicationUser>userManager)
        {
            context.Database.EnsureCreated();

            if (await userManager.FindByEmailAsync("bpaudel2@uco.edu") == null)
            {
                ApplicationUser newUser = new ApplicationUser()
                {
                    Email = "bpaudel2@uco.edu",
                    UserName = "bpaudel2"
                };
                var result = userManager.CreateAsync(newUser, "P&ssw0rd").GetAwaiter().GetResult();
                
                ApplicationUser newUser2 = new ApplicationUser()
                {
                    Email = "beekpal@gmail.com",
                    UserName = "beekpal"
                };
                var result2 = userManager.CreateAsync(newUser2, "P&ssw0rd").GetAwaiter().GetResult();
            }


            //Look for students.
            if (context.Todo.Any())
            {
                return; //DB has been seeded
            }
            var todos = new Todo[]
            {
                new Todo{title="TEST ACTIVE TODO",description="Test description for active todo",date="2018-04-24T11:59", tags="More,than,one,tags,can,be,entered,separated,with,comma", state="active", Owner="bpaudel2" },
                new Todo{title="TEST COMPLETED TODO",description="Test description for completed todo",date="2018-04-29T11:59", tags="tags,can,be,anything,apple,ball,cat,dog,elephant", state="completed", Owner="beekpal" },

            };
            foreach(Todo todo in todos)
            {
                context.Todo.Add(todo);
            }
            context.SaveChanges();
            var warningtimes = new Warningtime[]
            {
                new Warningtime{ dayhour="2days 0hours", Owner="beekpal"},
                new Warningtime{ dayhour="2days 0hours", Owner="bpaudel2"},
            };
            foreach(Warningtime warningtime in warningtimes)
            {
                context.Warningtime.Add(warningtime);
            }
            context.SaveChanges();
        }

    }
}
