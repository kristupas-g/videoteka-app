using Domain.Entities;
using MediatR;
using Videoteka.Application.Common.Interfaces;

namespace Videoteka.Application.Videos.Commands;

public record UploadStreamCommand(Guid Id, byte[] Stream) : IRequest;

public class UploadStreamCommandHandler : IRequestHandler<UploadStreamCommand>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly IVideoService _videoService;

    public UploadStreamCommandHandler(IApplicationDbContext dbContext, IVideoService videoService)
    {
        _dbContext = dbContext;
        _videoService = videoService;
    }


    public async Task<Unit> Handle(UploadStreamCommand request, CancellationToken cancellationToken)
    {
        await _videoService.StoreVideo(request.Stream, request.Id.ToString(), CancellationToken.None);

        return Unit.Value;
    }
}