using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Videoteka.Application.Common.Exceptions;
using Videoteka.Application.Common.Interfaces;
using Videoteka.Application.VideoComments.Queries.Dtos;

namespace Videoteka.Application.VideoComments.Queries;

public record GetVideoCommentsQuery(Guid Id) : IRequest<IEnumerable<VideoCommentDto>>;

public class GetVideoCommentsQueryHandler : IRequestHandler<GetVideoCommentsQuery, IEnumerable<VideoCommentDto>>
{
    private readonly IApplicationDbContext _dbContext;

    public GetVideoCommentsQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<VideoCommentDto>> Handle(GetVideoCommentsQuery request, CancellationToken cancellationToken)
    {
        return (await _dbContext.VideoComments
            .Include(x => x.Video)
            .Include(x => x.Author)
            .ToListAsync())
            .Where(x => x.VideoId == request.Id)
            .OrderByDescending(x => x.Created)
            .Select(x => new VideoCommentDto(x));
    }
}