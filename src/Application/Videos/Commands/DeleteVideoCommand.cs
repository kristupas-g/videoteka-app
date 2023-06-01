using MediatR;
using Microsoft.EntityFrameworkCore;
using Videoteka.Application.Common.Interfaces;

namespace Videoteka.Application.Videos.Commands;

public record DeleteVideoCommand(Guid Id) : IRequest, IAuthorizedRequest
{
    public async Task<bool> Authorize(IApplicationDbContext context, IAuthService authService)
    {
        var username = await authService.ValidateCookieAndGetUsername();
        var video = await context.Videos.Include(x => x.Uploader).FirstAsync(x => x.Id == Id);

        return username != null && video.Uploader.Username == username;
    }
}

public class DeleteVideoCommandHandler : IRequestHandler<DeleteVideoCommand>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly IVideoService _videoService;

    public DeleteVideoCommandHandler(IApplicationDbContext dbContext, IVideoService videoService)
    {
        _dbContext = dbContext;
        _videoService = videoService;
    }

    public async Task<Unit> Handle(DeleteVideoCommand request, CancellationToken cancellationToken)
    {
        var video = await _dbContext.Videos.FindAsync(request.Id);

        if (video == null)
        {
            return Unit.Value;
        }

        await _videoService.DeleteVideoAsync(request.Id.ToString());

        _dbContext.Videos.Remove(video);
        await _dbContext.SaveChangesAsync();

        return Unit.Value;
    }
}