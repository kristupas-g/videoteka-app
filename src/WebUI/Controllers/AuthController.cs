using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Videoteka.Application.Auth;

namespace Videoteka.WebUI.Controllers;

public class AuthController : ApiControllerBase
{
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