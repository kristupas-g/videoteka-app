using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Videoteka.Application.Common.Exceptions;
using Videoteka.Application.Common.Interfaces;
using Videoteka.Application.Videos.Queries.Dtos;

namespace Videoteka.Application.Videos.Queries;

public record GetRecommendedVideosQuery(Guid Id) : IRequest<IEnumerable<VideoDto>>;

public class GetRecommendedVideosQueryHandler : IRequestHandler<GetRecommendedVideosQuery, IEnumerable<VideoDto>>
{
    private readonly IApplicationDbContext _dbContext;

    public GetRecommendedVideosQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<VideoDto>> Handle(GetRecommendedVideosQuery request, CancellationToken cancellationToken)
    {
        var random = new Random();

        return (await _dbContext.Videos
            .Include(x => x.Uploader)
            .ToListAsync(cancellationToken))
            .Where(x => x.Id != request.Id)
            .OrderBy(x => random.Next())
            .Take(5)
            .Select(x => new VideoDto(x)); // randomize videos
    }
}
