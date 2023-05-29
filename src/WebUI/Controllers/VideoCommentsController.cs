using MediatR;
using Microsoft.AspNetCore.Mvc;
using Videoteka.Application.VideoComments.Commands;
using Videoteka.Application.Videos.Commands;

namespace Videoteka.WebUI.Controllers;

public class VideoCommentsController : ApiControllerBase
{
    [HttpPost]
    public async Task<Unit> Create(CreateCommentCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpDelete("{id}")]
    public async Task<Unit> Delete(Guid id)
    {
        return await Mediator.Send(new DeleteCommentCommand(id));
    }
}