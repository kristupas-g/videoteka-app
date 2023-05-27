using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using Videoteka.Application.Common.Interfaces;

namespace Videoteka.Application.Videos.Commands;

public record CreateVideoCommand : IRequest
{
    public string Name { get; init; }
    public IFormFile File { get; init; }
}

public class CreateVideoCommandHandler : IRequestHandler<CreateVideoCommand>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly IVideoService _videoService;

    public CreateVideoCommandHandler(IApplicationDbContext dbContext, IVideoService videoService)
    {
        _dbContext = dbContext;
        _videoService = videoService;
    }

    public async Task<Unit> Handle(CreateVideoCommand request, CancellationToken cancellationToken)
    {
        var id = Guid.NewGuid();
        var video = new Video
        {
            Id = id,
            Name = request.Name,
        };

        Stream stream = request.File.OpenReadStream();
        await _videoService.StoreVideo(stream, id.ToString());

        _dbContext.Videos.Add(video);
        await _dbContext.SaveChangesAsync();

        return Unit.Value;
    }
}