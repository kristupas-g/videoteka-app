using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Videoteka.Application.Auth;
using Videoteka.Application.Auth.Queries.Dtos;
using Videoteka.Application.Users.Queries;

namespace Videoteka.WebUI.Controllers;

public class UserController : ApiControllerBase
{
    [HttpGet("{id}")]
    public async Task<UserDto> GetSingle(Guid id)
    {
        return await Mediator.Send(new GetUserQuery(id));
    }
}