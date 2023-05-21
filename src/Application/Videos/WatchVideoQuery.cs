using Domain.Entities;
using MediatR;
using Videoteka.Application.Common.Interfaces;

namespace Videoteka.Application.Videos;

public record VideoQuery(string videoName) : IRequest<Stream>;

public class VideoQueryHandler : IRequestHandler<VideoQuery, Stream>
{
    private readonly IApplicationDbContext _context;
    private readonly IVideoService _videoService;

    public VideoQueryHandler(IApplicationDbContext context, IVideoService videoService)
    {
        _context = context;
        _videoService = videoService;
    }

    public async Task<Stream> Handle(VideoQuery request, CancellationToken cancellationToken)
    {
        var video = new Video{Name = "test-video.mp4"};

        var videoStream = await _videoService.GetVideoStream(video, cancellationToken);

        return videoStream;
    }
}