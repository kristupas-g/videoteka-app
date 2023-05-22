using Domain.Entities;
using MediatR;
using Videoteka.Application.Common.Exceptions;
using Videoteka.Application.Common.Interfaces;
using Videoteka.Application.Videos.Queries.Dtos;

namespace Videoteka.Application.Videos.Queries;

public record GetVideoQuery(Guid Id) : IRequest<VideoDto>;

public class GetVideoQueryHandler : IRequestHandler<GetVideoQuery, VideoDto>
{
    private readonly IApplicationDbContext _dbContext;

    public GetVideoQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<VideoDto> Handle(GetVideoQuery request, CancellationToken cancellationToken)
    {
        var video = await _dbContext.Videos.FindAsync(request.Id);

        if (video == null) {
            throw new NotFoundException(nameof(Video), request.Id);
        }

        return new VideoDto(video);
    }
}