using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Videoteka.Application.Auth;
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
    public async Task<IActionResult> LoginAsync(LoginCommand command)
    {
        return Ok(await Mediator.Send(command));
    }

    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> LogoutAsync(LogoutCommand command)
    {
        throw new NotImplementedException();
    }
}