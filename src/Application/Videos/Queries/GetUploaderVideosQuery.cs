using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Videoteka.Application.Common.Exceptions;
using Videoteka.Application.Common.Interfaces;
using Videoteka.Application.Videos.Queries.Dtos;

namespace Videoteka.Application.Videos.Queries;

public record GetUploaderVideosQuery(Guid uploaderId) : IRequest<IEnumerable<VideoDto>>, IAuthorizedRequest
    {
        public async Task<bool> Authorize(IApplicationDbContext context, IAuthService authService)
        {
            return await authService.ValidateCookieAndGetUsername() != null;
        }
    }

public class GetUploaderVideosQueryHandler : IRequestHandler<GetUploaderVideosQuery, IEnumerable<VideoDto>>
{
    private readonly IApplicationDbContext _dbContext;

    public GetUploaderVideosQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<VideoDto>> Handle(GetUploaderVideosQuery request, CancellationToken cancellationToken)
    {

       
         var videos = await _dbContext.Videos
            .Include(x => x.Uploader)
            .Where(x => x.UploaderId == request.uploaderId)
            .ToListAsync(cancellationToken);
        var videoDtos = videos.Select(x => new VideoDto(x)).ToList();
        return videoDtos;

    }

}