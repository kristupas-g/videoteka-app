using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Videoteka.Application.Videos;

namespace Videoteka.WebUI.Controllers;

public class VideoController : ApiControllerBase
{
    [HttpGet("watch/{videoName}")]
    [AllowAnonymous]
    public async Task<FileStreamResult> LoginAsync(string videoName)
    {
        var stream = await Mediator.Send(new VideoQuery(videoName));

        return new FileStreamResult(stream, "video/mp4");
    }
}