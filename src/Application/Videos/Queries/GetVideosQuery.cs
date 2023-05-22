using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Videoteka.Application.Common.Exceptions;
using Videoteka.Application.Common.Interfaces;
using Videoteka.Application.Videos.Queries.Dtos;

namespace Videoteka.Application.Videos.Queries;

public record GetVideosQuery : IRequest<IEnumerable<VideoDto>>;

public class GetVideosQueryHandler : IRequestHandler<GetVideosQuery, IEnumerable<VideoDto>>
{
    private readonly IApplicationDbContext _dbContext;

    public GetVideosQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<VideoDto>> Handle(GetVideosQuery request, CancellationToken cancellationToken)
    {
        return (await _dbContext.Videos.ToListAsync(cancellationToken)).Select(x => new VideoDto(x));
    }
}