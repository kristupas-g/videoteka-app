using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Videoteka.Application.Common.Interfaces;

namespace Videoteka.Application.Videos.Commands.CreateVideoCommand;

public record CreateVideoCommand : IRequest, IAuthorizedRequest
{
    public string Name { get; init; }
    public string? Description { get; init; }
    public IFormFile File { get; init; }

    public async Task<bool> Authorize(IApplicationDbContext context, IAuthService authService)
    {
        return await authService.ValidateCookieAndGetUsername() != null;
    }
}

public class CreateVideoCommandHandler : IRequestHandler<CreateVideoCommand>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly IVideoService _videoService;
    private readonly IAuthService _authService;

    public CreateVideoCommandHandler(
        IApplicationDbContext dbContext, IVideoService videoService, IAuthService authService)
    {
        _dbContext = dbContext;
        _videoService = videoService;
        _authService = authService;
    }

    public async Task<Unit> Handle(CreateVideoCommand request, CancellationToken cancellationToken)
    {
        var id = Guid.NewGuid();
        var user = await FindUserAsync();

        var thumbnailId = id.ToString() + "-THUMBNAIL.jpg";

        var video = new Video
        {
            Id = id,
            Name = request.Name,
            Description = request.Description,
            UploaderId = user.Id,
            ThumbnailUrl = _videoService.GetResourceUrl(thumbnailId),
            VideoUrl = _videoService.GetResourceUrl(id.ToString()),
        };

        using (IDbContextTransaction transaction = _dbContext.Database.BeginTransaction())
        {
            try
            {
                Stream stream = request.File.OpenReadStream();
                await _videoService.StoreVideo(stream, id.ToString());

                var thumbnailStream = await _videoService.GetFirstFrame(stream, cancellationToken);
                await _videoService.StoreVideo(thumbnailStream, thumbnailId);

                _dbContext.Videos.Add(video);
                await _dbContext.SaveChangesAsync();

                transaction.Commit();

                return Unit.Value;
            }
            catch (System.Exception)
            {
                transaction.Rollback();
                throw;
            }
        }
    }

    private async Task<User> FindUserAsync()
    {
        var username = await _authService.ValidateCookieAndGetUsername();

        return await _dbContext.Users.FirstAsync(x => x.Username == username);
    }
}