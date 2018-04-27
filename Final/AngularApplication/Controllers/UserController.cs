using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AngularApplication.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private SignInManager<ApplicationUser> signInManager;
        private UserManager<ApplicationUser> userManager;

        public UserController(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
        }

        [HttpPost]
        public IActionResult Login([FromBody]LoginViewModel loginViewModel)
        {
            var result = signInManager.PasswordSignInAsync(loginViewModel.UserName, loginViewModel.Password, true, false).GetAwaiter().GetResult();

            return new ObjectResult(result);
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody]RegisterViewModel registerViewModel)
        {
            ApplicationUser newUser = new ApplicationUser()
            {
                Email = registerViewModel.Email,
                UserName = registerViewModel.UserName
            };
            var result = userManager.CreateAsync(newUser, registerViewModel.Password).GetAwaiter().GetResult();
            return new ObjectResult(result);
        }

    }
}