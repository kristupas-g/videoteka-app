using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Videoteka.Application.Videos;
using Videoteka.Application.Videos.Commands;
using Videoteka.Application.Videos.Queries;
using Videoteka.Application.Videos.Queries.Dtos;

namespace Videoteka.WebUI.Controllers;

public class VideoController : ApiControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<IEnumerable<VideoDto>> GetAll()
    {
        return await Mediator.Send(new GetVideosQuery());
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<VideoDto> GetSingle(Guid id)
    {
        return await Mediator.Send(new GetVideoQuery(id));
    }

    [HttpGet("{id}/watch")]
    [AllowAnonymous]
    public async Task<FileStreamResult> GetStream(Guid id)
    {
        var stream = await Mediator.Send(new GetStreamQuery(id));

        return new FileStreamResult(stream, "video/mp4");
    }

    [HttpPost]
    public async Task<Unit> Create([FromForm] CreateVideoCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpDelete("{id}")]
    [AllowAnonymous]
    public async Task<Unit> Delete(Guid id)
    {
        return await Mediator.Send(new DeleteVideoCommand(id));
    }
}