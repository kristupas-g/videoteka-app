using Domain.Entities;
using MediatR;
using Videoteka.Application.Common.Interfaces;

namespace Videoteka.Application.Videos;

public record GetStreamQuery(Guid Id) : IRequest<Stream>;

public class GetStreamQueryHandler : IRequestHandler<GetStreamQuery, Stream>
{
    private readonly IApplicationDbContext _context;
    private readonly IVideoService _videoService;

    public GetStreamQueryHandler(IApplicationDbContext context, IVideoService videoService)
    {
        _context = context;
        _videoService = videoService;
    }

    public async Task<Stream> Handle(GetStreamQuery request, CancellationToken cancellationToken)
    {
        return await _videoService.GetVideoStream(request.Id.ToString(), cancellationToken);
    }
}