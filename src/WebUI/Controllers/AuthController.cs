using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Videoteka.Application.Auth.Queries;
using Videoteka.Application.Auth.Commands;
using Videoteka.Application.Auth.Queries.Dtos;

namespace Videoteka.WebUI.Controllers;

public class AuthController : ApiControllerBase
{
    [HttpGet]
    [Authorize]
    public async Task<UserDto?> GetUser()
    {
        return await Mediator.Send(new GetAuthenticatedUserQuery());
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login(LoginCommand command)
    {
        return Ok(await Mediator.Send(command));
    }

    [HttpPost("signup")]
    [AllowAnonymous]
    public async Task<IActionResult> Signup(SignupCommand command)
    {
        return Ok(await Mediator.Send(command));
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout(LogoutCommand command)
    {
        return Ok(await Mediator.Send(command));
    }
}