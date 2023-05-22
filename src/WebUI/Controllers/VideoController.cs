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
    public async Task<VideoDto> GetSingleAsync(Guid id)
    {
        return await Mediator.Send(new GetVideoQuery(id));
    }

    [HttpGet("{videoName}/watch")]
    [AllowAnonymous]
    public async Task<FileStreamResult> GetStreamAsync(string videoName)
    {
        var stream = await Mediator.Send(new VideoQuery(videoName));

        return new FileStreamResult(stream, "video/mp4");
    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<Unit> Create(CreateVideoCommand command)
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